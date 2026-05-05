// Selector ممكن تحطه في ملف منفصل عشان تعيد استخدامه
import { getAll,remove,update,Getusers, API } from "@/api/ServerFunctions";
import { Project, Task,AuthUser } from "@/types";
import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "@/api/ServerFunctions"; 
import { getAuthToken } from "@/auth/authStorage";
import toast from "react-hot-toast";


export const useUserProjects = (Token?: string) => {
  return useQuery({
    queryKey: ['projects', Token ?? null],
    
    queryFn: async () => getAll<Project>('projects'),

    select: (data) => {
      return data.filter((project:Project) => project.ownerId === Token)
      // return data
    },

    enabled: Boolean(Token),
  });
};

export const useProjectTasks = (projectId:string) => {
  return useQuery({
    queryKey:['tasks',projectId],
    queryFn: async () => getAll<Task>('tasks'),

    select:(data) => {
      return data.filter((e:Task) => e.projectId == projectId );
    },
    enabled:Boolean(projectId),
  })
}


export const GetTaskId = (id: string | string[] | undefined) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getAll<Task>('tasks'),
    select: (data) => {
        // نأمن نفسنا: لو الـ id مش موجود أو مصفوفة، نرجع undefined
        if (typeof id !== 'string') return undefined;
        return data.find((e) => String(e.id) === id);
    }
  });
};

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updates }: { id: string | number; [key: string]: any }) => 
      update("tasks", id, updates),
    onSuccess: (data) => {
      // تحديث كاش التاسك المعين وكاش لستة التاسكات
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.id] });
    },
    
  });
}


export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProject: Partial<Project>) => create("projects", newProject),

    // 1. أول ما اليوزر يدوس (قبل السيرفر ما يرد)
    onMutate: async (newProject) => {
      // وقف أي fetches شغالة للبروجكتات عشان ميعملوش overwrite للي هنعمله
      await queryClient.cancelQueries({ queryKey: ['projects'] });

      // خد نسخة احتياطية من الكاش القديم (Snapshot)
      const previousProjects = queryClient.getQueryData(['projects']);

      // حدث الكاش فوراً بالداتا الجديدة (Optimistic)
      queryClient.setQueryData(['projects'], (old: any) => [...(old || []), { 
        ...newProject, 
        id: Math.random().toString(), // id مؤقت
        isOptimistic: true // ممكن تستخدمها عشان تخليه شفاف شوية مثلاً
      }])
      // رجع النسخة الاحتياطية عشان لو حصل إيرور نستخدمها
      return { previousProjects };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      
      console.log("المشروع نزل يا وحش! 🚀");
    },

    onError: (error) => {
      console.error("فيه خازوق حصل وأنت بتبعت:", error);
    },
  });
}

export function UseDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. الـ mutationFn بتاخد الـ ID وبتبعته للـ API
    mutationFn: (id: string|number) => remove("projects", id),

    onMutate: async (deletedId) => {
      // إلغاء أي Fetching شغال عشان ميبوظش الـ Optimistic Update
      await queryClient.cancelQueries({ queryKey: ['projects'] });

      // خد نسخة احتياطية من الكاش القديم
      const previousProjects = queryClient.getQueryData<Project[]>(['projects']);

      // 2. التحديث المتفائل: شيل المشروع من الكاش فوراً قبل ما الـ API يرد
      queryClient.setQueryData<Project[]>(['projects'], (old) => 
        old?.filter((project) => project.id !== deletedId)
      );

      // رجع النسخة الاحتياطية عشان لو حصل إيرور نرجعها (Rollback)
      return { previousProjects };
    },

    // 3. لو حصل "خازوق" (Error)، رجع الداتا القديمة مكانها
    onError: (err, deletedId, context) => {
      if (context?.previousProjects) {
        console.log(context);
        queryClient.setQueryData(['projects'], context.previousProjects);
      }
      console.error("فشل الحذف، رجعنا كل حاجة زي ما كانت:", err);
    },

    // 4. في كل الأحوال (نجاح أو فشل)، حدث الداتا من السيرفر للتأكيد
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },

    onSuccess: () => {
      console.log("المشروع اتمسح يا وحش! 🗑️");
    },
  });
}


export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTask: Partial<Task>) => create("tasks", newTask),

    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousProjects = queryClient.getQueryData(['tasks']);

      queryClient.setQueryData(['tasks'], (old: any) => [...(old || []), { 
        ...newTask,
        id: Math.random().toString(), // id مؤقت
      }])
      return { previousProjects };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task Aded")
    },

    onError: (error) => {
      console.error("فيه خازوق حصل وأنت بتبعت:", error);
      toast.success("حصل مشكله جاول تاني")
    },
  });
}


export function GetUSer () {
  const queryClient = useQueryClient();
  const token = getAuthToken()
  
   return useQuery<AuthUser[], Error, AuthUser|undefined>({
    queryKey: ["users",token],
    queryFn: () => Getusers(API),

    select: (data) => {
      if (!token) return undefined;
      return data.find((e) => e.id === token) as AuthUser;
    },
  });

}