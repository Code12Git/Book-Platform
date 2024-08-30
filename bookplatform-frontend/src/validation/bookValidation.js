 const bookValidation = (formData) => {
        const errors = {};
        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }
        if (!formData.author.trim()) {
            errors.author = 'Author is required';
        }
        if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }
        if (!formData.genre.trim()) {
            errors.genre = 'Genre is required';
        }
        return errors;
};

export default bookValidation;
