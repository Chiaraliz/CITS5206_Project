function PageNotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl md:text-3xl font-light text-gray-600 mt-4">
          Oops! Page not found.
        </p>
        <p className="text-gray-500 mt-2">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
