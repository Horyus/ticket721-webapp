export const search = (state = "", action) => {
    if (action.type === 'UPDATE_SEARCH') {
        return action.new_value
    } else {
        return state;
    }
};
