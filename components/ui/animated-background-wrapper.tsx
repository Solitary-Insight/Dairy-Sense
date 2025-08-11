// components/AnimatedBackgroundWrapper.jsx
export default function AnimatedBackgroundWrapper({ children }) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {/* Blobs Background */}
        <div className="absolute inset-0 h-full w-full overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute top-10 right-1/3 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-[3000ms]"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-[1000ms]"></div>
          <div className="absolute bottom-40 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-[5000ms]"></div>
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-[5000ms]"></div>
          <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-[5000ms]"></div>
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-[5000ms]"></div>
        </div>
  
        {/* Children Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
  