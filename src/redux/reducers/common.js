const defaultState = {
    appName: '',
    modalMode: false,
    coords: {lat: 35.55951, lng: -82.5515, zoom: 11}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            console.log(`toggling modal: ${action.modalMode}`);
            return {
                ...defaultState,
                modalMode: action.modalMode
            };
        default:
            return state;
    }
};