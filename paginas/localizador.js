const storeLocations = [
    { name: "Love&Coffee São Paulo (SP)", latitude: -23.5505, longitude: -46.6333 },
    { name: "Love&Coffee Rio de Janeiro (RJ)", latitude: -22.9068, longitude: -43.1729 },
    { name: "Love&Coffee Belo Horizonte (MG)", latitude: -19.9167, longitude: -43.9345 }
];

const findStoreButton = document.querySelector("#find-store");
const storeResult = document.querySelector("#store-result");

function distanceInKilometers(origin, destination) {
    const radians = (degrees) => degrees * Math.PI / 180;
    const latitudeDifference = radians(destination.latitude - origin.latitude);
    const longitudeDifference = radians(destination.longitude - origin.longitude);
    const originLatitude = radians(origin.latitude);
    const destinationLatitude = radians(destination.latitude);
    const haversine = Math.sin(latitudeDifference / 2) ** 2
        + Math.cos(originLatitude) * Math.cos(destinationLatitude)
        * Math.sin(longitudeDifference / 2) ** 2;

    return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function showNearestStore(position) {
    const visitorLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    const nearestStore = storeLocations
        .map((store) => ({ ...store, distance: distanceInKilometers(visitorLocation, store) }))
        .reduce((nearest, store) => store.distance < nearest.distance ? store : nearest);
    const distance = nearestStore.distance < 1
        ? "menos de 1 km"
        : `${Math.round(nearestStore.distance)} km`;

    storeResult.textContent = `A unidade demonstrativa mais próxima seria ${nearestStore.name}, a aproximadamente ${distance} em linha reta.`;
    findStoreButton.disabled = false;
}

function showLocationError(error) {
    if (error.code === error.PERMISSION_DENIED) {
        storeResult.textContent = "Permissão de localização negada. Autorize o acesso no navegador para encontrar a unidade demonstrativa mais próxima.";
    } else if (error.code === error.POSITION_UNAVAILABLE) {
        storeResult.textContent = "Não foi possível obter sua localização. Tente novamente em alguns instantes.";
    } else if (error.code === error.TIMEOUT) {
        storeResult.textContent = "A solicitação de localização demorou demais. Tente novamente.";
    } else {
        storeResult.textContent = "Ocorreu um erro ao tentar obter sua localização.";
    }

    findStoreButton.disabled = false;
}

findStoreButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        storeResult.textContent = "Este navegador não oferece suporte à localização.";
        return;
    }

    findStoreButton.disabled = true;
    storeResult.textContent = "Aguardando permissão para acessar sua localização...";
    navigator.geolocation.getCurrentPosition(
        showNearestStore,
        showLocationError,
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
});
