import React from "react";

const Dashboard = (props) => {
  return (
    <div>
      <>
        {/* component */}
        <div className="bg-white">
          <div className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Transaction
                    </p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Amount
                    </p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Date
                    </p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Status
                    </p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                      Account
                    </p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://docs.material-tailwind.com/img/logos/logo-spotify.svg"
                        alt="Spotify"
                        className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                        Spotify
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      $2,500
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      Wed 3:00pm
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div
                        className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md"
                        style={{ opacity: 1 }}
                      >
                        <span className="">paid</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                        <img
                          src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                          alt="visa"
                          className="inline-block relative object-center !rounded-none rounded-md h-full w-full object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">
                          visa
                          {/* */}
                          {/* */}1234
                        </p>
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                          06/2026
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                      type="button"
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://docs.material-tailwind.com/img/logos/logo-amazon.svg"
                        alt="Amazon"
                        className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                        Amazon
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      $5,000
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      Wed 1:00pm
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div
                        className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md"
                        style={{ opacity: 1 }}
                      >
                        <span className="">paid</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                        <img
                          src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                          alt="master-card"
                          className="inline-block relative object-center !rounded-none rounded-md h-full w-full object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">
                          master card
                          {/* */}
                          {/* */}1234
                        </p>
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                          06/2026
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                      type="button"
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://docs.material-tailwind.com/img/logos/logo-pinterest.svg"
                        alt="Pinterest"
                        className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                        Pinterest
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      $3,400
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      Mon 7:40pm
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div
                        className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-amber-500/20 text-amber-900 py-1 px-2 text-xs rounded-md"
                        style={{ opacity: 1 }}
                      >
                        <span className="">pending</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                        <img
                          src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                          alt="master-card"
                          className="inline-block relative object-center !rounded-none rounded-md h-full w-full object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">
                          master card
                          {/* */}
                          {/* */}1234
                        </p>
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                          06/2026
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                      type="button"
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://docs.material-tailwind.com/img/logos/logo-google.svg"
                        alt="Google"
                        className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                        Google
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      $1,000
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      Wed 5:00pm
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div
                        className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md"
                        style={{ opacity: 1 }}
                      >
                        <span className="">paid</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                        <img
                          src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                          alt="visa"
                          className="inline-block relative object-center !rounded-none rounded-md h-full w-full object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">
                          visa
                          {/* */}
                          {/* */}1234
                        </p>
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                          06/2026
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                      type="button"
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://docs.material-tailwind.com/img/logos/logo-netflix.svg"
                        alt="netflix"
                        className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                        netflix
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      $14,000
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      Wed 3:30am
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="w-max">
                      <div
                        className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-red-500/20 text-red-900 py-1 px-2 text-xs rounded-md"
                        style={{ opacity: 1 }}
                      >
                        <span className="">cancelled</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                        <img
                          src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                          alt="visa"
                          className="inline-block relative object-center !rounded-none rounded-md h-full w-full object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">
                          visa
                          {/* */}
                          {/* */}1234
                        </p>
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                          06/2026
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                      type="button"
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
