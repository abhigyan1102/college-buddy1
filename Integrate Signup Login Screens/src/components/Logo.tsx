export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xl">CB</span>
      </div>
      <div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 leading-none">
          Campus
        </div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 leading-none">
          Buddy
        </div>
      </div>
    </a>
  );
}
