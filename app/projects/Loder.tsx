
const CommentSkeleton = () => {
    return (
      <>
      <div className="flex gap-3 p-4 w-full max-w-md mx-auto animate-pulse">
        {/* دائرة مكان صورة البروفايل */}
        <div className="w-10 h-10 bg-zinc-700 rounded-full"></div>
  
        {/* محتوى الكومنت */}
        <div className="flex-1 space-y-3 py-1">
          {/* مكان الاسم */}
          <div className="h-3 bg-zinc-700 rounded w-1/4"></div>
          
          {/* مكان نص الكومنت */}
          <div className="space-y-2">
            <div className="h-3 bg-zinc-700 rounded w-full"></div>
            <div className="h-3 bg-zinc-700 rounded w-5/6"></div>
          </div>
          
          {/* مكان أزرار التفاعل (Like, Reply) */}
          <div className="flex gap-4 pt-2">
            <div className="h-2 bg-zinc-800 rounded w-10"></div>
            <div className="h-2 bg-zinc-800 rounded w-10"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-4 w-full max-w-md mx-auto animate-pulse">
        {/* دائرة مكان صورة البروفايل */}
        <div className="w-10 h-10 bg-zinc-700 rounded-full"></div>
  
        {/* محتوى الكومنت */}
        <div className="flex-1 space-y-3 py-1">
          {/* مكان الاسم */}
          <div className="h-3 bg-zinc-700 rounded w-1/4"></div>
          
          {/* مكان نص الكومنت */}
          <div className="space-y-2">
            <div className="h-3 bg-zinc-700 rounded w-full"></div>
            <div className="h-3 bg-zinc-700 rounded w-5/6"></div>
          </div>
          
          {/* مكان أزرار التفاعل (Like, Reply) */}
          <div className="flex gap-4 pt-2">
            <div className="h-2 bg-zinc-800 rounded w-10"></div>
            <div className="h-2 bg-zinc-800 rounded w-10"></div>
          </div>
        </div>
      </div>
      </>
    );
  };

export default CommentSkeleton;