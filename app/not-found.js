// app/not-found.js or app/your-route/not-found.js

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-500 mb-4">
        🚧 Page Under Maintenance
      </h1>
      <p className="text-lg text-gray-400">
        We're working on this page. Please check back later
      </p>
    </div>
  );
}
