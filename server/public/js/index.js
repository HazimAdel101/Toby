function toggleCollection(collectionId, button) {
    var collection = document.getElementById('collection' + collectionId);
    var arrowIcon = document.getElementById('arrowIcon' + collectionId);

    if (collection.classList.contains('hidden')) {
        collection.classList.remove('hidden');
        arrowIcon.classList.add('rotate-90');
    } else {
        collection.classList.add('hidden');
        arrowIcon.classList.remove('rotate-90');
    }
}

function populateUpdateForm(id, name, description) {
    document.getElementById('collectionId').value = id;
    document.getElementById('collectionName').value = name;
    document.getElementById('collectionDescription').value = description;
}

function confirmDelete(id, name) {
    document.getElementById('deleteCollectionId').value = id;
    document.getElementById('deleteCollectionName').textContent = name;
}