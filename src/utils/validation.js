// validation.js
export const validateProduct = (product, productKey) => {
    const errors = {};
    const { name, description, price, releaseDate, category } = product[productKey];

    if (!name || name.length < 5 || /\d/.test(name)) {
        errors.name = 'Name must be at least 5 characters long and contain no numbers';
    }
    if (!description || description.length <= 10) {
        errors.description = 'Description must be more than 10 characters';
    }
    if (!price || isNaN(price) || price <= 0 || price > 10000000) {
        errors.price = 'Price must be a positive number greater than zero and not exceed 10 million';
    }
    if (!releaseDate) {
        errors.releaseDate = 'Release Date is required';
    } else {
        const [year, month, day] = releaseDate.split('-').map(Number);
        if (year < 2007) errors.releaseDate = 'Year must be 2007 or later';
        if (month < 1 || month > 12) errors.releaseDate = 'Month must be between 01 and 12';
        if (day < 1 || day > 31) errors.releaseDate = 'Day must be between 01 and 31';
    }
    if (!category || category.length > 20) {
        errors.category = 'Category must be 20 characters or less';
    }
    return errors;
};
