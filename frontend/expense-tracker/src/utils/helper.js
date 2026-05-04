export const validateEmail = (email) => {
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
export const getInitials = (fullName) => {
    if (!fullName) return '';
    const names = fullName.split(' ');
    return names[0].charAt(0).toUpperCase() + (names[1] ? names[1].charAt(0).toUpperCase() : '');
  }; 

export const addThousandSeparator = (num) => {
    if (num === null || isNaN(num)) return '';
    const [integerPart, fractionalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));
    return chartData;
}