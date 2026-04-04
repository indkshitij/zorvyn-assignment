const categoriesUnsorted = [
  // Income
  { name: "Salary", bgColor: "#2ECC71" },
  { name: "Bonus", bgColor: "#27AE60" },
  { name: "Freelance", bgColor: "#1ABC9C" },
  { name: "Investments", bgColor: "#16A085" },
  { name: "Dividends", bgColor: "#58D68D" },
  { name: "Rental Income", bgColor: "#52BE80" },
  { name: "Interest", bgColor: "#239B56" },

  // Food & Dining
  { name: "Food", bgColor: "#E67E22" },
  { name: "Groceries", bgColor: "#D35400" },
  { name: "Dining Out", bgColor: "#F39C12" },
  { name: "Snacks", bgColor: "#E59866" },
  { name: "Beverages", bgColor: "#CA6F1E" },
  { name: "Coffee", bgColor: "#AF601A" },
  { name: "Fast Food", bgColor: "#DC7633" },
  { name: "Street Food", bgColor: "#EB984E" },

  // Shopping
  { name: "Shopping", bgColor: "#9B59B6" },
  { name: "Clothing", bgColor: "#8E44AD" },
  { name: "Shoes", bgColor: "#7D3C98" },
  { name: "Accessories", bgColor: "#BB8FCE" },
  { name: "Electronics", bgColor: "#6C3483" },
  { name: "Gadgets", bgColor: "#5B2C6F" },
  { name: "Home Decor", bgColor: "#A569BD" },
  { name: "Jewelry", bgColor: "#AF7AC5" },

  // Travel & Transport
  { name: "Travel", bgColor: "#3498DB" },
  { name: "Flights", bgColor: "#2E86C1" },
  { name: "Hotels", bgColor: "#5DADE2" },
  { name: "Taxi", bgColor: "#1F618D" },
  { name: "Fuel", bgColor: "#2874A6" },
  { name: "Public Transport", bgColor: "#21618C" },
  { name: "Train", bgColor: "#3498DB" },
  { name: "Bus", bgColor: "#5DADE2" },
  { name: "Car Rental", bgColor: "#2E86C1" },
  { name: "Parking", bgColor: "#1B4F72" },

  // Bills & Utilities
  { name: "Bills", bgColor: "#7F8C8D" },
  { name: "Electricity", bgColor: "#626567" },
  { name: "Water", bgColor: "#95A5A6" },
  { name: "Internet", bgColor: "#566573" },
  { name: "Mobile Recharge", bgColor: "#808B96" },
  { name: "Gas", bgColor: "#707B7C" },
  { name: "DTH", bgColor: "#99A3A4" },

  // Entertainment
  { name: "Entertainment", bgColor: "#E84393" },
  { name: "Movies", bgColor: "#D81B60" },
  { name: "Music", bgColor: "#C2185B" },
  { name: "Games", bgColor: "#AD1457" },
  { name: "Subscriptions", bgColor: "#F06292" },
  { name: "OTT", bgColor: "#EC407A" },
  { name: "Events", bgColor: "#FF80AB" },

  // Health & Fitness
  { name: "Health", bgColor: "#E74C3C" },
  { name: "Medicines", bgColor: "#C0392B" },
  { name: "Doctor", bgColor: "#A93226" },
  { name: "Gym", bgColor: "#CD6155" },
  { name: "Insurance", bgColor: "#922B21" },
  { name: "Yoga", bgColor: "#EC7063" },
  { name: "Mental Health", bgColor: "#F1948A" },

  // Education
  { name: "Education", bgColor: "#1ABC9C" },
  { name: "Books", bgColor: "#16A085" },
  { name: "Courses", bgColor: "#48C9B0" },
  { name: "School Fees", bgColor: "#0E6655" },
  { name: "Stationery", bgColor: "#45B39D" },
  { name: "Online Learning", bgColor: "#73C6B6" },

  // Personal & Lifestyle
  { name: "Gifts", bgColor: "#F4D03F" },
  { name: "Donations", bgColor: "#F1C40F" },
  { name: "Beauty", bgColor: "#F7DC6F" },
  { name: "Salon", bgColor: "#D4AC0D" },
  { name: "Self Care", bgColor: "#F9E79F" },
  { name: "Spa", bgColor: "#FDEBD0" },

  // Home
  { name: "Rent", bgColor: "#A04000" },
  { name: "Maintenance", bgColor: "#6E2C00" },
  { name: "Furniture", bgColor: "#873600" },
  { name: "Appliances", bgColor: "#A0522D" },
  { name: "Cleaning", bgColor: "#935116" },
  { name: "Repairs", bgColor: "#784212" },

  // Pets
  { name: "Pets", bgColor: "#D35400" },
  { name: "Pet Food", bgColor: "#CA6F1E" },
  { name: "Vet", bgColor: "#A04000" },

  // Work
  { name: "Office Supplies", bgColor: "#5D6D7E" },
  { name: "Software", bgColor: "#34495E" },
  { name: "Hosting", bgColor: "#2C3E50" },

  // Finance
  { name: "Taxes", bgColor: "#7D6608" },
  { name: "Loan EMI", bgColor: "#873600" },
  { name: "Credit Card", bgColor: "#512E5F" },
  { name: "Savings", bgColor: "#1E8449" },

  // Misc
  { name: "Miscellaneous", bgColor: "#BDC3C7" },
  { name: "Emergency", bgColor: "#E74C3C" },
  { name: "Others", bgColor: "#AAB7B8" },
];

const categories = [...categoriesUnsorted].sort((a, b) => a.name.localeCompare(b.name));

export default categories;

// Category map
export const categoryMap = categories.reduce((acc, cat) => {
  acc[cat.name.toLowerCase()] = cat.bgColor;
  return acc;
}, {});
