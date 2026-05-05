"use client";

import { useRouter } from "next/navigation";
import { GetUSer, useCreateProject } from '@/lib/Selecteds';
import { useAppForm } from '@/Hooks/useForm'; // افترضنا إنك حطيته هنا
import toast from "react-hot-toast";

export default function CreateProjectPage() {
  const router = useRouter();
  const { data: user } = GetUSer();
  const { mutate, isPending } = useCreateProject();

  const validateProject = (data: any) => {
    const errors: Record<string, string> = {};
    if (data.name.trim().length < 3) errors.name = "اسم المشروع لازم يكون أكتر من 3 حروف يا وحش";
    if (data.description.trim().length < 10) errors.desc = "الوصف قصير زيادة، وضح التفاصيل أكتر";
    if (!user?.id) errors.user = "مش عارف أوصل لبيانات اليوزر، استنى ثانية!";
    return errors;
  };

  const { formData, handleChange, handleSubmit } = useAppForm(
    { name: "", description: "", status: "active", priority: "medium" },
    (finalData) => {
      mutate(
        {
          ...finalData,
          ownerId: user?.id,
          createdAt: new Date().toISOString().split("T")[0],
        },
        {
          onSuccess: (data) => {
            toast.success("تم إنشاء المشروع بنجاح! 🚀");
            router.push("/projects");
          },
          onError: (data,err) => {
            toast.error("حصلت مشكلة وأحنا بنكريت المشروع");
          }
        }
      );
    },
    validateProject
  );

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>مشروع جديد</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>حدد تفاصيل المشروع لبدء تتبع التاسكات.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">اسم المشروع</label>
          <input
            name="name" // مهم جداً عشان الـ handleChange يشتغل
            type="text"
            className="w-full rounded-lg border p-3 bg-transparent outline-none focus:ring-1"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">الوصف</label>
          <textarea
            name="description"
            rows={4}
            className="w-full rounded-lg border p-3 bg-transparent outline-none"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">الحالة</label>
            <select
              name="status"
              className="w-full rounded-lg border p-3 bg-transparent outline-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)", background: "var(--color-surface)" }}
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="planned">Planned</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">الأولوية</label>
            <select
              name="priority"
              className="w-full rounded-lg border p-3 bg-transparent outline-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)", background: "var(--color-surface)" }}
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
          <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-lg text-sm bg-[var(--color-surface-2)]">إلغاء</button>
          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-2 rounded-lg text-sm font-bold bg-[var(--color-primary)] text-white disabled:opacity-50"
          >
            {isPending ? "جاري الحفظ..." : "إنشاء المشروع"}
          </button>
        </div>
      </form>
    </div>
  );
}