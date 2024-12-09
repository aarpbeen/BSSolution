"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLast12MonthData = generateLast12MonthData;
// A generic function to generate last 12 months data for any Mongoose model
async function generateLast12MonthData(model) {
    const last12Months = [];
    const currentDate = new Date();
    const lastYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth() + 1, 1); // 12 months ago
    const data = await model.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: lastYear, // Fetch documents created within the last 12 months
                },
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' }, // Group by year
                    month: { $month: '$createdAt' }, // Group by month
                },
                count: { $sum: 1 }, // Count the number of documents
            },
        },
        {
            $sort: {
                '_id.year': 1,
                '_id.month': 1, // Sort by year and month ascending
            },
        },
    ]);
    // Create an array for the last 12 months
    for (let i = 11; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const month = date.toLocaleString('default', { month: 'long' }); // Get month name (e.g., "January")
        const year = date.getFullYear(); // Get year (e.g., "2023")
        const record = data.find(d => d._id.year === year && d._id.month === date.getMonth() + 1);
        last12Months.push({
            month: `${month} ${year}`, // Format the month and year (e.g., "January 2023")
            count: record ? record.count : 0, // Use 0 if no record is found for that month
        });
    }
    return { last12Months };
}
// export async function generateLast12MonthData<T extends Document>(
//   model: Model<T>
// ): Promise<{ last12Months: MonthData[] }> {
//   const last12Months: MonthData[] = [];
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() + 1); // Increment current date by one day for consistency
//   for (let i = 11; i >= 0; i--) {
//     const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i * 28); // End date for the period
//     const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 28); // Start date 28 days prior
//     const monthYear = endDate.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' }); // Format for display
//     const count = await model.countDocuments({
//       createdAt: {
//         $gte: startDate,
//         $lt: endDate
//       }
//     });
//     last12Months.push({
//       month: monthYear,
//       count: count, // Number of documents created between `startDate` and `endDate`
//     });
//   }
//   return { last12Months };
// }
