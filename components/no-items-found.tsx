export function NoItemsFound({heading,subHeading,img,}) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <img
          src="/placeholder.svg?height=100&width=100"
          alt="No farms"
          className="mb-4 opacity-70"
        />
        <h3 className="text-lg font-semibold text-gray-700">No Farms Found</h3>
        <p className="text-sm text-gray-500 mb-4">
          You haven't registered any farms yet.
        </p>
        <button
          className="px-4 py-2 text-sm bg-green-600 text-white rounded shadow hover:bg-green-700"
        >
          Add New Farm
        </button>
      </div>
    );
  }
  