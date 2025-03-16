'use client';

interface UVProtectionTableProps {
  config: {
    columns: { key: string; label: string; icon: React.ReactNode }[]; 
    rows: { key: string; label: string }[]; 
  };
  data: { [key: string]: { [key: string]: boolean } }; 
}

const UVProtectionTable: React.FC<UVProtectionTableProps> = ({ config, data }) => {
  return (
    <div className="bg-white w-full overflow-x-auto shadow-2xl">
      <div className="overflow-hidden min-w-max">
        {/* Table Header */}
        <div
            className="grid p-4 text-sm font-medium text-gray-900 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            style={{ gridTemplateColumns: `150px repeat(${config.columns.length}, 1fr)` }}
        >
          <div className="text-left text-lg font-bold">UV Rating</div>
          {config.columns.map((col) => (
            <div key={col.key} className="flex items-center justify-center">
              {col.icon}
            </div>
          ))}
        </div>

        {/* Table Content (Dynamic Rows) */}
        {config.rows.map((row) => (
          <div key={row.key} className="grid px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700"
          style={{ gridTemplateColumns: `150px repeat(${config.columns.length}, 1fr)` }}
          >
            {/* UV Level */}
            <div className="text-gray-900 dark:text-white font-bold">
              {row.label}
            </div>
            {/* Dynamically Render Cells */}
            {config.columns.map((col) => (
              <div key={col.key} className="flex justify-center">
                {data[row.key]?.[col.key] ? (
                  <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UVProtectionTable;