// function toggleCollection(collectionId, button) {
//     var collection = document.getElementById('collection' + collectionId);
//     var arrowIcon = document.getElementById('arrowIcon' + collectionId);

//     if (collection.classList.contains('hidden')) {
//         collection.classList.remove('hidden');
//         arrowIcon.classList.add('rotate-90');
//     } else {
//         collection.classList.add('hidden');
//         arrowIcon.classList.remove('rotate-90');
//     }
// }

function populateUpdateForm(id, name, description) {
    document.getElementById('collectionId').value = id;
    document.getElementById('collectionName').value = name;
    document.getElementById('collectionDescription').value = description;
}

function populateBookmarkUpdateForm (id, name, url, icon) {
    document.getElementById('bookmarkId3').value = id;
    document.getElementById('bookmarkName').value = name;
    document.getElementById('url2').value = url;
    
    console.log(`icon: ${icon}, name: ${name}, url: ${url}, id: ${id}`);
    const iconImage = document.querySelector('#update-bookmark-modal img');
    iconImage.src = `/uploads/${icon}`;
    iconImage.alt = name
}

function confirmBookmarkDelete(id, name) {
    document.getElementById('deleteLinkId').value = id;
    document.getElementById('deleteLinkName').textContent = name;
}

function confirmDelete (id, name) {
    document.getElementById('deleteCollectionId').value = id;
    document.getElementById('deleteCollectionName').textContent = name;
}


function populateCreateBookmarkForm(collectionId) {
    document.getElementById('collectionId1').value = collectionId;
    console.log('Collection id:', collectionId);
}

function createBookmarkButtonClicked(button) {
    var collectionId = button.getAttribute('data-collection-id');
    console.log('Collection id:', collectionId);

    populateCreateBookmarkForm(collectionId);
}


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

function expandAllCollections() {
    document.querySelectorAll('[id^="collection"]').forEach(collection => {
        collection.classList.remove('hidden');
    });
    document.querySelectorAll('[id^="arrowIcon"]').forEach(arrowIcon => {
        arrowIcon.classList.add('rotate-90');
    });
}

function collapseAllCollections() {
    document.querySelectorAll('[id^="collection"]').forEach(collection => {
        collection.classList.add('hidden');
    });
    document.querySelectorAll('[id^="arrowIcon"]').forEach(arrowIcon => {
        arrowIcon.classList.remove('rotate-90');
    });
}

document.getElementById('expandAll').addEventListener('click', expandAllCollections);
document.getElementById('collapseAll').addEventListener('click', collapseAllCollections);

document.querySelectorAll('[data-modal-toggle]').forEach(function (modalToggle) {
    modalToggle.addEventListener('click', function (event) {
        event.preventDefault();
        const targetModalId = modalToggle.getAttribute('data-modal-toggle');
        const modal = document.getElementById(targetModalId);
        if (modal) {
            modal.classList.toggle('hidden');
        }
    });
});