const imageUpload = document.getElementById("imageUpload");
const uploadedImage = document.getElementById("uploadedImage");
const statusMessage = document.getElementById("statusMessage");
const imagesLayer =
    document.getElementById("imagesLayer");
    const layersList =
    document.getElementById(
        "layersList"
    );

const layersSection =
    document.querySelector(
        ".layers-section"
    );

const productSelect = document.getElementById("productSelect");
const productPreview = document.getElementById("productPreview");
const printArea = document.getElementById("printArea");

const productTitle = document.getElementById("productTitle");
const printAreaInfo = document.getElementById("printAreaInfo");

const productName = document.getElementById("productName");
const productPrice =
    document.getElementById("productPrice");
const productDimensions = document.getElementById("productDimensions");
const printDimensions = document.getElementById("printDimensions");

const tshirtOptions = document.getElementById("tshirtOptions");
const variantOptions = document.getElementById("variantOptions");
const variantButtons = document.getElementById("variantButtons");
const printShapeMask = document.getElementById("printShapeMask");
const orientationOptions = document.getElementById("orientationOptions");
const mobileOrientationToggle = document.getElementById("mobileOrientationToggle");
const printFormatOptions =
    document.getElementById("printFormatOptions");

const zoomRange = document.getElementById("zoomRange");
const rotationRange = document.getElementById("rotationRange");
const rotationValue =
    document.getElementById("rotationValue");

const textInput = document.getElementById("textInput");
const fontSelect = document.getElementById("fontSelect");
const customText = document.getElementById("customText");
const textsLayer =
    document.getElementById(
        "textsLayer"
    );

const addTextButton =
    document.getElementById(
        "addTextButton"
    );
const textColor = document.getElementById("textColor");
const textOutlineEnabled =
    document.getElementById("textOutlineEnabled");

const textOutlineColor =
    document.getElementById("textOutlineColor");

const textOutlineWidth =
    document.getElementById("textOutlineWidth");

const textOutlineWidthValue =
    document.getElementById("textOutlineWidthValue");

const textOutlineOptions =
    document.getElementById("textOutlineOptions");
const boldButton =
    document.getElementById("boldButton");

const italicButton =
    document.getElementById("italicButton");
    const textAlignLeft =
    document.getElementById(
        "textAlignLeft"
    );

const textAlignCenter =
    document.getElementById(
        "textAlignCenter"
    );

const textAlignRight =
    document.getElementById(
        "textAlignRight"
    );
const guideVertical = document.getElementById("guideVertical");
const guideHorizontal = document.getElementById("guideHorizontal");
const rotationGuide =
    document.getElementById("rotationGuide");

const textSizeRange =
    document.getElementById("textSizeRange");
    const textSizeInfo =
    document.getElementById(
        "textSizeInfo"
    );

const textSizeValue =
    document.getElementById(
        "textSizeValue"
    );

    const textRotationRange =
    document.getElementById("textRotationRange");
    const textRotationValue =
    document.getElementById("textRotationValue");

const resetButton = document.getElementById("resetButton");
const centerImageButton =
    document.getElementById("centerImageButton");

    const heartLogoButton =
    document.getElementById("heartLogoButton");

const centerTextButton =
    document.getElementById("centerTextButton");
    const selectionControls =
    document.getElementById("selectionControls");

    const selectionWidthCm =
    document.getElementById(
        "selectionWidthCm"
    );

const selectionHeightCm =
    document.getElementById(
        "selectionHeightCm"
    );

const directRotateButton =
    document.getElementById("directRotateButton");

const directMoveButton =
    document.getElementById("directMoveButton");
    const directFlipButton =
    document.getElementById("directFlipButton");
    const directDeleteButton =
    document.getElementById("directDeleteButton");
    const bringForwardButton =
    document.getElementById("bringForwardButton");
    const previewZoomRange =
    document.getElementById("previewZoomRange");

const previewZoomValue =
    document.getElementById("previewZoomValue");

const mobileTshirtZoomOut =
    document.getElementById("mobileTshirtZoomOut");
const mobileTshirtZoomIn =
    document.getElementById("mobileTshirtZoomIn");
const mobileTshirtZoomValue =
    document.getElementById("mobileTshirtZoomValue");

    const previewPanel = document.querySelector(".preview-panel");

const zoomOutPreviewButton =
    document.getElementById("zoomOutPreviewButton");

const zoomInPreviewButton =
    document.getElementById("zoomInPreviewButton");

const resetPreviewZoomButton =
    document.getElementById("resetPreviewZoomButton");

    const undoButton =
    document.getElementById("undoButton");

const redoButton =
    document.getElementById("redoButton");

const sendBackwardButton =
    document.getElementById("sendBackwardButton");

    const cartCount =
    document.getElementById("cartCount");

const quantityInput =
    document.getElementById("quantity");

const addToCartButton =
    document.getElementById("addToCartButton");
    const cartButton =
    document.getElementById("cartButton");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCartButton =
    document.getElementById("closeCartButton");

const cartItemsContainer =
    document.getElementById("cartItems");

const emptyCartMessage =
    document.getElementById("emptyCartMessage");

    const cartTotal =
    document.getElementById("cartTotal");

const cartFooter =
    document.getElementById("cartFooter");

    const imageSizeInfo =
    document.getElementById("imageSizeInfo");

const imageSizeValue =
    document.getElementById("imageSizeValue");

    const printBgColor =
    document.getElementById("printBgColor");

const clearPrintBgButton =
    document.getElementById("clearPrintBgButton");

    cartItemsContainer.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest("button");

        if (!button) {
            return;
        }


        const id =
            Number(button.dataset.id);

        const item =
            cartItems.find(function (cartItem) {
                return cartItem.id === id;
            });


        if (
            button.classList.contains("increase") &&
            item
        ) {

            item.quantity++;
        }


        if (
            button.classList.contains("decrease") &&
            item
        ) {

            if (item.quantity > 1) {
                item.quantity--;
            }
        }


        if (
            button.classList.contains(
                "remove-cart-item"
            )
        ) {

            cartItems =
                cartItems.filter(
                    function (cartItem) {
                        return cartItem.id !== id;
                    }
                );
        }


        configuratorStorage.setItem(
            "mycustomCart",
            JSON.stringify(cartItems)
        );


        updateCartCount();
        renderCart();
    }
);

    directFlipButton.addEventListener("click", function () {

    if (!selectedElementType) {
        return;
    }

    /*
    Salviamo lo stato prima
    del capovolgimento.
*/
saveHistoryState();

    if (selectedElementType === "image") {
        flipImage();
    }

    if (selectedElementType === "text") {
        flipText();
    }
});

bringForwardButton.addEventListener(
    "click",
    function () {

        if (!selectedElementType) {
            return;
        }

                /*
            Salviamo i livelli prima
            di portare avanti l'elemento.
        */
        saveHistoryState();


        const state =
            getCurrentState();


        /*
            Prima salviamo eventuali
            modifiche fatte alla foto
            selezionata.
        */
        syncSelectedImageFromLegacyState();


        const allLayers = [

    ...state.images.map(
        function (imageState) {
            return imageState.layer;
        }
    ),

    ...state.texts.map(
        function (textState) {
            return textState.layer;
        }
    )
];


        const highestLayer =
            Math.max(
                ...allLayers
            );


        if (
            selectedElementType ===
            "image"
        ) {

            const selectedImage =
                getSelectedImageState();

            if (!selectedImage) {
                return;
            }


            selectedImage.layer =
                highestLayer + 1;

            state.imageLayer =
                selectedImage.layer;

        } else {

    const selectedText =
        getSelectedTextState();


    if (!selectedText) {
        return;
    }


    selectedText.layer =
        highestLayer + 1;


    state.textLayer =
        selectedText.layer;
}


        normalizeElementLayers();

        refreshMultipleLayers();


        statusMessage.textContent =
            "Elemento portato davanti.";
    }
);


sendBackwardButton.addEventListener(
    "click",
    function () {

        if (!selectedElementType) {
            return;
        }

                /*
            Salviamo i livelli prima
            di portare indietro l'elemento.
        */
        saveHistoryState();


        const state =
            getCurrentState();


        syncSelectedImageFromLegacyState();


        const allLayers = [

    ...state.images.map(
        function (imageState) {
            return imageState.layer;
        }
    ),

    ...state.texts.map(
        function (textState) {
            return textState.layer;
        }
    )
];


        const lowestLayer =
            Math.min(
                ...allLayers
            );


        if (
    selectedElementType ===
    "image"
) {

    const selectedImage =
        getSelectedImageState();


    if (!selectedImage) {
        return;
    }


    selectedImage.layer =
        lowestLayer - 1;


    state.imageLayer =
        selectedImage.layer;

} else {

    const selectedText =
        getSelectedTextState();


    if (!selectedText) {
        return;
    }


    selectedText.layer =
        lowestLayer - 1;


    state.textLayer =
        selectedText.layer;
}


        normalizeElementLayers();

        refreshMultipleLayers();


        statusMessage.textContent =
            "Elemento portato dietro.";
    }
);

function updateMobileTextSelectionBar() {

    const mobileTextSelectionBar =
        document.getElementById(
            "mobileTextSelectionBar"
        );

    if (!mobileTextSelectionBar) {
        return;
    }

    const shouldShow =
        window.innerWidth <= 600 &&
        selectedElementType === "text";

    mobileTextSelectionBar.classList.toggle(
        "visible",
        shouldShow
    );

    if (!shouldShow) {
        closeMobileTextMenus();
    }
}

function showSelectionControls(element, type) {

    selectedElementType = type;
    updateMobileTextSelectionBar();

    uploadedImage.classList.remove("selected-element");
    customText.classList.remove("selected-element");

    element.classList.add("selected-element");

    const previewRect =
        productPreview.getBoundingClientRect();

    const elementRect =
        element.getBoundingClientRect();

    const scale =
        previewZoom / 100;

    const left =
        (elementRect.left - previewRect.left) / scale;

    const top =
        (elementRect.top - previewRect.top) / scale;

    const width =
        elementRect.width / scale;

    const height =
        elementRect.height / scale;

        const compactControls =
    (
        type === "image" &&
        Math.min(width, height) < 70
    ) ||
    (
        type === "text" &&
        height < 24
    );
    
    const cornerHandleSize = compactControls ? 10 : 14;

selectionControls.classList.toggle(
    "compact-controls",
    compactControls
);

    selectionControls.style.left =
        `${left}px`;

    selectionControls.style.top =
        `${top}px`;

    selectionControls.style.width =
        `${width}px`;

    selectionControls.style.height =
        `${height}px`;

    selectionControls.style.transform =
        "none";

    selectionControls.style.display =
        "block";
        updateSelectionSizeLabels();
}

productPreview.addEventListener("pointerdown", function (event) {

    if (
        event.target === uploadedImage ||
        event.target === customText ||
        event.target.closest(".multi-uploaded-image") ||
        event.target.closest(".multi-custom-text") ||
        selectionControls.contains(event.target)
    ) {
        return;
    }

    uploadedImage.classList.remove(
        "selected-element"
    );

    customText.classList.remove(
        "selected-element"
    );

    selectionControls.style.display =
        "none";

    selectedElementType = null;

    updateMobileTextSelectionBar();
});

let isDirectRotating = false;
let rotationCenterX = 0;
let rotationCenterY = 0;
let isDirectResizing = false;

let resizeStartDistance = 0;
let resizeStartScale = 1;
let resizeStartTextSize = 26;

let resizeCenterX = 0;
let resizeCenterY = 0;

directRotateButton.addEventListener("pointerdown", function (event) {

    if (!selectedElementType) {
        return;
    }

    /*
        Salviamo la rotazione prima
        di iniziare a ruotare.
    */
    saveHistoryState();

    const selectedElement =
        selectedElementType === "image"
            ? uploadedImage
            : customText;

    const rect =
        selectedElement.getBoundingClientRect();

    rotationCenterX =
        rect.left + (rect.width / 2);

    rotationCenterY =
        rect.top + (rect.height / 2);

    isDirectRotating = true;

    event.preventDefault();
    event.stopPropagation();
});
directMoveButton.addEventListener("pointerdown", function (event) {

    if (!selectedElementType) {
        return;
    }

    /*
        Salviamo la posizione PRIMA
        dello spostamento.
    */
    saveHistoryState();

    const state = getCurrentState();

    if (selectedElementType === "image") {

        isDragging = true;

        startX = event.clientX / getMobileTshirtDragScale() - state.x;
        startY = event.clientY / getMobileTshirtDragScale() - state.y;

        uploadedImage.style.cursor = "grabbing";

    } else {

        isDraggingText = true;

        textStartX =
            event.clientX / getMobileTshirtDragScale() - state.textX;

        textStartY =
            event.clientY / getMobileTshirtDragScale() - state.textY;

        customText.style.cursor = "grabbing";
    }

    event.preventDefault();
    event.stopPropagation();
});

document
    .querySelectorAll(".resize-handle")
    .forEach(function (handle) {

        handle.addEventListener("pointerdown", function (event) {

    if (!selectedElementType) {
        return;
    }

    /*
        Salviamo la dimensione PRIMA
        del ridimensionamento.
    */
    saveHistoryState();

    const state = getCurrentState();

            const selectedElement =
                selectedElementType === "image"
                    ? uploadedImage
                    : customText;

            const rect =
                selectedElement.getBoundingClientRect();

            resizeCenterX =
                rect.left + (rect.width / 2);

            resizeCenterY =
                rect.top + (rect.height / 2);

            const deltaX =
                event.clientX - resizeCenterX;

            const deltaY =
                event.clientY - resizeCenterY;

            resizeStartDistance =
                Math.sqrt(
                    (deltaX * deltaX) +
                    (deltaY * deltaY)
                );

            resizeStartScale = state.scale;
            resizeStartTextSize = state.textSize;

            isDirectResizing = true;

            event.preventDefault();
            event.stopPropagation();
        });
    });

directDeleteButton.addEventListener(
    "click",
    function () {

        if (!selectedElementType) {
            return;
        }

        const state =
            getCurrentState();


        if (
            selectedElementType ===
            "image"
        ) {

            const selectedImage =
    getSelectedImageState();


if (!selectedImage) {
    return;
}


/*
    Salviamo lo stato prima
    di eliminare la foto.
*/
saveHistoryState();


/*
    Eliminiamo solamente
    la foto selezionata.
*/
state.images =
    state.images.filter(
                    function (imageState) {

                        return (
                            imageState.id !==
                            selectedImage.id
                        );
                    }
                );


            /*
                Se rimangono altre foto,
                selezioniamo automaticamente
                l'ultima disponibile.
            */
            if (
                state.images.length > 0
            ) {

                const nextImage =
                    state.images[
                        state.images.length - 1
                    ];


                state.selectedImageId =
                    nextImage.id;


                loadSelectedImageIntoLegacyState();

                renderCurrentState();


                selectedElementType =
                    "image";


                requestAnimationFrame(
                    function () {

                        showSelectionControls(
                            uploadedImage,
                            "image"
                        );
                    }
                );


                statusMessage.textContent =
                    "Immagine eliminata.";

            } else {

                /*
                    Non rimane più
                    nessuna immagine.
                */
                state.selectedImageId =
                    null;

                state.imageSrc = "";

                state.x = 0;
                state.y = 0;

                state.scale = 1;
                state.rotation = 0;

                state.imageFlipped =
                    false;

                state.imageLayer = 1;


                uploadedImage.src = "";

                uploadedImage.style.display =
                    "none";


                renderMultiImages();


                selectedElementType =
                    null;

                selectionControls.style.display =
                    "none";


                imageSizeValue.textContent =
                    "—";


                statusMessage.textContent =
                    "Immagine eliminata.";
            }


            imageUpload.value = "";

            return;
        }


        /*
    ELIMINAZIONE TESTO
*/
if (
    selectedElementType ===
    "text"
) {

    syncSelectedTextFromLegacyState();


const selectedText =
    getSelectedTextState();


if (!selectedText) {
    return;
}


/*
    Salviamo lo stato prima
    di eliminare la scritta.
*/
saveHistoryState();


state.texts =
    state.texts.filter(
            function (textState) {

                return (
                    textState.id !==
                    selectedText.id
                );
            }
        );


    /*
        Se rimangono altre scritte,
        selezioniamo l'ultima.
    */
    if (
        state.texts.length > 0
    ) {

        const nextText =
            state.texts[
                state.texts.length - 1
            ];


        state.selectedTextId =
            nextText.id;


        loadSelectedTextIntoLegacyState();


        selectedElementType =
            "text";


        renderCurrentState();


        requestAnimationFrame(
            function () {

                showSelectionControls(
                    customText,
                    "text"
                );
            }
        );


    } else {

        state.selectedTextId =
            null;


        state.text = "";

        state.textX = 0;
        state.textY = 0;

        state.textSize = 26;
        state.textRotation = 0;

        state.fontFamily =
            "Arial";

        state.textColor =
            "#000000";

        state.textOutlineEnabled =
            false;

        state.textOutlineColor =
            "#ffffff";

        state.textOutlineWidth =
            1;

        state.textBold =
            false;

        state.textItalic =
            false;

        state.textAlign =
            "center";

        state.textFlipped =
            false;

        state.textLayer =
            2;

        state.textVisible =
            true;


        customText.textContent =
            "";

        customText.style.display =
            "none";


        textInput.value =
            "";


        selectedElementType =
            null;


        selectionControls.style.display =
            "none";


        renderCurrentState();
    }


    statusMessage.textContent =
        "Testo eliminato.";


    return;
}
    }
);

document.addEventListener("pointermove", function (event) {

    if (!isDirectResizing) {
        return;
    }

    const state = getCurrentState();

    const deltaX =
        event.clientX - resizeCenterX;

    const deltaY =
        event.clientY - resizeCenterY;

    const currentDistance =
        Math.sqrt(
            (deltaX * deltaX) +
            (deltaY * deltaY)
        );

    if (resizeStartDistance === 0) {
        return;
    }

    const ratio =
        currentDistance / resizeStartDistance;


    if (selectedElementType === "image") {

        let newScale =
            resizeStartScale * ratio;

        const minScale =
    getMinimumImageScale();

const maxScale =
    getMaximumImageScale();


newScale =
    Math.max(
        minScale,
        Math.min(
            maxScale,
            newScale
        )
    );

        state.scale = newScale;

        zoomRange.value = newScale;

        updateImageTransform();

        showSelectionControls(
            uploadedImage,
            "image"
        );

    } else {

    let newTextSize =
        resizeStartTextSize * ratio;

    const sliderMax =
        Number(textSizeRange.max);

    newTextSize =
        Math.max(
            10,
            Math.min(
                sliderMax,
                newTextSize
            )
        );

    state.textSize =
        Math.round(newTextSize);

    customText.style.fontSize =
        `${state.textSize}px`;

    textSizeRange.value =
        state.textSize;

    refreshTextLayout();
}
});
document.addEventListener("pointerup", function () {

    if (!isDirectResizing) {
        return;
    }

    isDirectResizing = false;
});

document.addEventListener("pointermove", function (event) {

    if (!isDirectRotating) {
        return;
    }

    const state = getCurrentState();

    const radians = Math.atan2(
        event.clientY - rotationCenterY,
        event.clientX - rotationCenterX
    );

    let degrees =
        radians * (180 / Math.PI) + 90;

    degrees = Math.round(degrees);

    if (degrees > 180) {
        degrees -= 360;
    }

    if (degrees < -180) {
        degrees += 360;
    }
    const snapAngles = [
    -180,
    -90,
    -45,
    0,
    45,
    90,
    180
];

const snapDistance = 3;

let snappedAngle = null;

snapAngles.forEach(function (angle) {

    if (
        Math.abs(degrees - angle) <= snapDistance
    ) {
        degrees = angle;
        snappedAngle = angle;
    }
});
if (snappedAngle !== null) {

    statusMessage.textContent =
        `Rotazione agganciata a ${snappedAngle}°`;

    rotationGuide.style.display = "block";

    rotationGuide.style.transform =
        `translate(-50%, -50%)
         rotate(${snappedAngle}deg)`;

} else {

    rotationGuide.style.display = "none";
}

    if (selectedElementType === "image") {

        state.rotation = degrees;

        rotationRange.value = degrees;
        rotationValue.textContent = `${degrees}°`;

        updateImageTransform();

        showSelectionControls(
            uploadedImage,
            "image"
        );

    } else {

        state.textRotation = degrees;

        textRotationRange.value = degrees;
        textRotationValue.textContent =
            `${degrees}°`;

        customText.style.transform =
            `translate(
                calc(-50% + ${state.textX}px),
                calc(-50% + ${state.textY}px)
            )
            rotate(${state.textRotation}deg)`;

            refreshTextLayout();

        showSelectionControls(
            customText,
            "text"
        );
    }
});

document.addEventListener("pointerup", function () {

    if (!isDirectRotating) {
        return;
    }

    isDirectRotating = false;

    rotationGuide.style.display = "none";
});

/*
    Indica se abbiamo già salvato
    lo stato all'inizio della modifica
    del testo.
*/
let isEditingText = false;

/*
    Memorizza la scritta appena creata.
    Ci servirà per distinguerla
    da una scritta già esistente.
*/
let newlyCreatedTextId = null;

let selectedElementType = null;

let isDragging = false;

let startX = 0;
let startY = 0;

let currentProduct = productSelect.value;

let tshirtColor = "white";
let tshirtSize = "M";
let tshirtFabric = "cotton"; // "cotton" (100% cotone) oppure "polyester"
let tshirtFit = "adult";     // "adult" (adulto unisex) oppure "kids" (bambino)
let tshirtSide = "front";

/* Cuscini quadrati: colore del retro (vedi CUSHION_BACK_COLORS) */
let cushionBackColor = "red";

/* Portachiavi in MDF: si stampano anche sul retro (facoltativo).
   keychainSide è il lato che si sta personalizzando. */
let keychainSide = "front";
let keychainSideProduct = null;

function isDoubleSidedProduct(productKey) {
    return Boolean(
        typeof products !== "undefined" &&
        products[productKey] &&
        products[productKey].layout === "keychain-mdf"
    );
}

let tshirtPrintFormat = {
    front: "vertical",
    back: "vertical"
};


const products = {

    cushion: {
        title: "Cuscino grande",
        name: "Cuscino personalizzato",
        dimensions: "Dimensione: 40x40 cm",
        print: "Area di stampa: 30x30 cm",
        printInfo: "Area stampabile 30x30 cm",
        price: 15.00
    },

    tshirt: {
        title: "T-Shirt personalizzabile",
        name: "T-Shirt personalizzata",
        dimensions: "Taglie disponibili: S, M, L, XL, XXL",
        print: "Area massima di stampa: 30x40 cm",
        printInfo: "Area stampabile massima 30x40 cm",
        price: 15.00
    },

    keychain: {
        title: "Portachiavi quadrato 4,5x4,5 cm",
        name: "Portachiavi personalizzato",
        dimensions: "Dimensione: 4,5x4,5 cm",
        print: "Superficie interamente stampabile",
        printInfo: "Area stampabile 4,5x4,5 cm",
        price: 10.00
    }

};


/* =========================================
   NUOVI PRODOTTI
   -----------------------------------------
   Funzionano come il cuscino (un solo lato).
   - printCm: area reale di stampa in cm, presa dai
     modelli a 300 dpi (comprende il margine di taglio).
   - layout: aspetto dell'anteprima (vedi style.css).
   - price: null = prezzo ancora da definire
     (il prodotto si personalizza ma non va nel carrello).
   ========================================= */

Object.assign(products, {

    "cushion-small": {
        title: "Cuscino quadrato piccolo",
        name: "Cuscino piccolo personalizzato",
        dimensions: "Formato: quadrato piccolo",
        print: "Area di stampa: 16x16 cm",
        printInfo: "Area stampabile 16x16 cm",
        printCm: { width: 16, height: 16 },
        layout: "cushion",
        price: 10.00
    },

    "heart-small": {
        title: "Cuscino a cuore piccolo",
        name: "Cuscino a cuore personalizzato",
        dimensions: "Dimensione: circa 15x15 cm",
        print: "Superficie del cuore interamente stampabile",
        printInfo: "Area stampabile circa 14,5x14,5 cm",
        printCm: { width: 14.4, height: 14.7 },
        layout: "heart",
        shape: "heart-small",
        price: 10.00
    },

    "heart-large": {
        title: "Cuscino a cuore grande",
        name: "Cuscino a cuore personalizzato",
        dimensions: "Dimensione: circa 35x30 cm",
        print: "Superficie del cuore interamente stampabile",
        printInfo: "Area stampabile circa 35x30 cm",
        printCm: { width: 35, height: 30.2 },
        layout: "heart",
        shape: "heart-large",
        price: 15.00
    },

    "canvas-s": {
        title: "Tela 18x24 cm",
        name: "Tela personalizzata",
        dimensions: "Dimensione: 18x24 cm",
        print: "Area di stampa: 18x24 cm + 0,5 cm di margine per lato",
        printInfo: "Area stampabile 18x24 cm (con margine)",
        printCm: { width: 19, height: 25 },
        nominal: { width: 18, height: 24 },
        orientable: true,
        marginNote: "canvas",
        layout: "canvas",
        price: null // DA DEFINIRE
    },

    "canvas-m": {
        title: "Tela 20x30 cm",
        name: "Tela personalizzata",
        dimensions: "Dimensione: 20x30 cm",
        print: "Area di stampa: 20x30 cm + 0,5 cm di margine per lato",
        printInfo: "Area stampabile 20x30 cm (con margine)",
        printCm: { width: 21, height: 31 },
        nominal: { width: 20, height: 30 },
        orientable: true,
        marginNote: "canvas",
        layout: "canvas",
        price: null // DA DEFINIRE
    },

    "canvas-l": {
        title: "Tela 30x40 cm",
        name: "Tela personalizzata",
        dimensions: "Dimensione: 30x40 cm",
        print: "Area di stampa: 30x40 cm + 0,5 cm di margine per lato",
        printInfo: "Area stampabile 30x40 cm (con margine)",
        printCm: { width: 31, height: 41 },
        nominal: { width: 30, height: 40 },
        orientable: true,
        marginNote: "canvas",
        layout: "canvas",
        price: null // DA DEFINIRE
    },

    "tile-square": {
        title: "Mattonella 20x20 cm",
        name: "Mattonella personalizzata",
        dimensions: "Dimensione: 20x20 cm",
        print: "Area di stampa: 20x20 cm + margine di taglio",
        printInfo: "Area stampabile 20x20 cm (con margine)",
        printCm: { width: 20.5, height: 20.5 },
        layout: "tile",
        price: null // DA DEFINIRE
    },

    "tile-rect": {
        title: "Mattonella 15x20 cm",
        name: "Mattonella personalizzata",
        dimensions: "Dimensione: 15x20 cm",
        print: "Area di stampa: 15x20 cm + margine di taglio",
        printInfo: "Area stampabile 15x20 cm (con margine)",
        printCm: { width: 20.5, height: 15.5 },
        nominal: { width: 20, height: 15 },
        orientable: true,
        marginNote: "tile",
        layout: "tile",
        price: null // DA DEFINIRE
    },

    "tile-small": {
        title: "Mattonella 10x10 cm",
        name: "Mattonella personalizzata",
        dimensions: "Dimensione: 10x10 cm",
        print: "Area di stampa: 10x10 cm + margine di taglio",
        printInfo: "Area stampabile 10x10 cm (con margine)",
        printCm: { width: 10.5, height: 10.5 },
        layout: "tile",
        price: null // DA DEFINIRE
    },

    /* ARDESIE: area di stampa = misura della pietra; la sagoma
       (foto vera) copre il bordo in pietra, che non si stampa. */

    "slate-15": {
        title: "Ardesia quadrata 15x15 cm",
        name: "Ardesia personalizzata",
        dimensions: "Dimensione: 15x15 cm, con supporti",
        print: "Area di stampa: 15x15 cm (il bordo in pietra non si stampa)",
        printInfo: "Area stampabile 15x15 cm · bordo in pietra",
        printCm: { width: 15, height: 15 },
        layout: "slate",
        shape: "slate-square",
        price: null // DA DEFINIRE
    },

    "slate-20": {
        title: "Ardesia quadrata 20x20 cm",
        name: "Ardesia personalizzata",
        dimensions: "Dimensione: 20x20 cm, con supporti",
        print: "Area di stampa: 20x20 cm (il bordo in pietra non si stampa)",
        printInfo: "Area stampabile 20x20 cm · bordo in pietra",
        printCm: { width: 20, height: 20 },
        layout: "slate",
        shape: "slate-square",
        price: null // DA DEFINIRE
    },

    "slate-rect": {
        title: "Ardesia rettangolare 15x20 cm",
        name: "Ardesia personalizzata",
        dimensions: "Dimensione: 15x20 cm, con supporti",
        print: "Area di stampa: 20x15 cm (il bordo in pietra non si stampa)",
        printInfo: "Area stampabile 20x15 cm · bordo in pietra",
        printCm: { width: 20, height: 15 },
        nominal: { width: 20, height: 15 },
        orientable: true,
        marginNote: "slate",
        layout: "slate",
        shape: "slate-rect",
        price: null // DA DEFINIRE
    },

    "slate-heart": {
        title: "Ardesia a cuore",
        name: "Ardesia a cuore personalizzata",
        dimensions: "Formato: cuore, circa 15x14 cm, con supporti",
        print: "Area di stampa: circa 15x14 cm (il bordo in pietra non si stampa)",
        printInfo: "Area stampabile circa 15x14 cm · bordo in pietra",
        printCm: { width: 15, height: 13.8 },
        layout: "slate",
        shape: "slate-heart",
        price: null // DA DEFINIRE
    },

    /* PUZZLE: ogni formato ha la sua sagoma (foto del puzzle bianco):
       linee di taglio sopra il disegno, cornice intorno all’area di stampa */

    "puzzle-a4": {
        title: "Puzzle A4",
        name: "Puzzle personalizzato",
        dimensions: "Formato: A4, 21x29,7 cm, 42 tasselli grandi",
        print: "Area di stampa: 21x29,7 cm",
        printInfo: "Area stampabile 21x29,7 cm",
        printCm: { width: 21, height: 29.7 },
        nominal: { width: 21, height: 29.7 },
        orientable: true,
        marginNote: "none",
        layout: "puzzle",
        shape: "puzzle-a4",
        price: null // DA DEFINIRE
    },

    "puzzle-a3": {
        title: "Puzzle A3",
        name: "Puzzle personalizzato",
        dimensions: "Formato: A3, 29,7x42 cm, 130 tasselli grandi",
        print: "Area di stampa: 29,7x42 cm",
        printInfo: "Area stampabile 29,7x42 cm",
        printCm: { width: 29.7, height: 42 },
        nominal: { width: 29.7, height: 42 },
        orientable: true,
        marginNote: "none",
        layout: "puzzle",
        shape: "puzzle-a3",
        price: null // DA DEFINIRE
    },

    /* CALAMITE IN MDF
       Pergamena: i bordi ondulati sono nella maschera, ricavata dalla
       foto della calamita bianca. MISURE DA CONFERMARE col fornitore. */

    "magnet-parchment": {
        title: "Calamita pergamena",
        name: "Calamita pergamena personalizzata",
        dimensions: "Formato: pergamena, circa 10x7 cm",
        print: "Area di stampa: 10x7 cm (i bordi ondulati tagliano un po' l'immagine)",
        printInfo: "Area stampabile 10x7 cm · bordi a pergamena",
        printCm: { width: 10, height: 7 },
        nominal: { width: 10, height: 7 },
        orientable: true,
        marginNote: "parchment",
        layout: "magnet",
        shape: "magnet-parchment",
        price: null // DA DEFINIRE
    },

    mousepad: {
        title: "Tappetino mouse 22x18 cm",
        name: "Tappetino mouse personalizzato",
        dimensions: "Dimensione: 22x18 cm",
        print: "Area di stampa: 22x18 cm + margine di taglio",
        printInfo: "Area stampabile 22x18 cm (con margine)",
        printCm: { width: 22.5, height: 18.5 },
        layout: "mousepad",
        price: 10.00
    },

    /* PORTACHIAVI IN LEGNO MDF
       printCm = area di stampa (bordo esterno del modello),
       la linea tratteggiata è la linea di taglio (0,2 cm più interna). */

    "keychain-round": {
        title: "Portachiavi tondo",
        name: "Portachiavi in legno personalizzato",
        dimensions: "Formato: tondo, diametro 5 cm",
        print: "Area di stampa: diametro 5,2 cm (0,2 cm di scarto oltre il tratteggio)",
        printInfo: "Tratteggio = linea di taglio · stampa fino a 5,2 cm",
        printCm: { width: 5.2, height: 5.2 },
        layout: "keychain-mdf",
        shape: "keychain-round",
        price: 10.00
    },

    "keychain-square": {
        title: "Portachiavi quadrato",
        name: "Portachiavi in legno personalizzato",
        dimensions: "Formato: quadrato 5x5 cm",
        print: "Area di stampa: 5,2x5,2 cm (0,2 cm di scarto oltre il tratteggio)",
        printInfo: "Tratteggio = linea di taglio · stampa fino a 5,2x5,2 cm",
        printCm: { width: 5.2, height: 5.2 },
        layout: "keychain-mdf",
        shape: "keychain-square",
        price: 10.00
    },

    "keychain-rect": {
        title: "Portachiavi rettangolare",
        name: "Portachiavi in legno personalizzato",
        dimensions: "Formato: rettangolare 4x6 cm",
        print: "Area di stampa: 4,2x6,2 cm (0,2 cm di scarto oltre il tratteggio)",
        printInfo: "Tratteggio = linea di taglio · stampa fino a 4,2x6,2 cm",
        printCm: { width: 4.2, height: 6.2 },
        nominal: { width: 4, height: 6 },
        orientable: true,
        marginNote: "keychain",
        layout: "keychain-mdf",
        shape: "keychain-rect",
        price: 10.00
    },

    "keychain-heart": {
        title: "Portachiavi cuore",
        name: "Portachiavi in legno personalizzato",
        dimensions: "Formato: cuore, circa 5 cm",
        print: "Area di stampa: circa 5,2 cm (0,2 cm di scarto oltre il tratteggio)",
        printInfo: "Tratteggio = linea di taglio · stampa fino a 5,2 cm",
        printCm: { width: 5.2, height: 4.84 },
        layout: "keychain-mdf",
        shape: "keychain-heart",
        price: 10.00
    }
});


/*
   Famiglie di prodotti e relative varianti
   (servono per i pulsanti "Formato" nel pannello).
*/
const productVariants = {
    cushion:         { group: "cuscini",  label: "Quadrato grande" },
    "cushion-small": { group: "cuscini",  label: "Quadrato piccolo" },
    "heart-small":   { group: "cuscini",  label: "Cuore piccolo" },
    "heart-large":   { group: "cuscini",  label: "Cuore grande" },
    tshirt:          { group: "tshirt",   label: "T-Shirt" },
    keychain:        { group: "keychain-old", label: "Quadrato 4,5×4,5" }, // non più in vendita
    "keychain-round":  { group: "keychain", label: "Tondo" },
    "keychain-square": { group: "keychain", label: "Quadrato" },
    "keychain-rect":   { group: "keychain", label: "Rettangolo" },
    "keychain-heart":  { group: "keychain", label: "Cuore" },
    "canvas-s":      { group: "tele",     label: "18×24" },
    "canvas-m":      { group: "tele",     label: "20×30" },
    "canvas-l":      { group: "tele",     label: "30×40" },
    "tile-small":    { group: "mattonelle", label: "10×10" },
    "tile-square":   { group: "mattonelle", label: "20×20" },
    "tile-rect":     { group: "mattonelle", label: "15×20" },
    "slate-15":      { group: "ardesie",  label: "15×15" },
    "slate-20":      { group: "ardesie",  label: "20×20" },
    "slate-rect":    { group: "ardesie",  label: "15×20" },
    "slate-heart":   { group: "ardesie",  label: "Cuore" },
    "puzzle-a4":     { group: "puzzle",   label: "A4" },
    "puzzle-a3":     { group: "puzzle",   label: "A3" },
    "magnet-parchment": { group: "calamite", label: "Pergamena" },
    mousepad:       { group: "tappetini", label: "22×18" }
};


/* Foto del prodotto vero, mostrate in un angolo dell'anteprima
   ("Dal vero") e in grande al clic. Solo per i prodotti che le hanno. */
const productRealPhotos = {
    "tile-square": {
        src: "assets/home/mattonella-20x20-foto.jpg",
        alt: "Mattonella in ceramica stampata con una foto, su cavalletto",
        caption: "Mattonella quadrata in ceramica, stampata e sul suo cavalletto"
    },
    "tile-rect": {
        src: "assets/home/mattonella-15x20-foto.jpg",
        alt: "Mattonelle 15×20 in ceramica, una bianca e una stampata con una foto",
        caption: "Mattonelle 15×20 in ceramica: bianca e stampata con una foto"
    },
    mousepad: {
        src: "assets/home/tappetino-dal-vero.jpg",
        alt: "Tappetino mouse stampato con un'iniziale e un nome, con il mouse sopra",
        caption: "Tappetino mouse 22×18 cm stampato, con il mouse sopra"
    }
};

productRealPhotos["tile-small"] = productRealPhotos["tile-square"];

productRealPhotos["slate-15"] = productRealPhotos["slate-20"] = {
    src: "assets/home/ardesia-quadrata-foto.jpg",
    alt: "Ardesia quadrata stampata con una foto di famiglia a Natale",
    caption: "Ardesia quadrata stampata, sui suoi supporti"
};

productRealPhotos["slate-rect"] = {
    src: "assets/home/ardesia-15x20-foto.jpg",
    alt: "Ardesia rettangolare stampata con una foto, sui suoi supporti",
    caption: "Ardesia 15x20 stampata, sui suoi supporti"
};

productRealPhotos["slate-heart"] = {
    src: "assets/home/ardesia-cuore-foto.jpg",
    alt: "Ardesia a cuore stampata con la foto di una bambina al mare",
    caption: "Ardesia a cuore stampata, sui suoi supporti"
};

productRealPhotos["puzzle-a4"] = productRealPhotos["puzzle-a3"] = {
    src: "assets/home/puzzle-foto.jpg",
    alt: "Puzzle stampato con una foto, con alcuni pezzi staccati",
    caption: "Puzzle stampato con una foto"
};

/* Portachiavi in MDF: la foto della stessa forma */
productRealPhotos["keychain-round"] = {
    src: "assets/home/portachiavi-tondo.jpg",
    alt: "Portachiavi tondo in MDF stampato con una coppia al tramonto",
    caption: "Portachiavi tondo in MDF stampato, con anello e fascetta"
};

productRealPhotos["keychain-square"] = {
    src: "assets/home/portachiavi-quadrato.jpg",
    alt: "Portachiavi quadrato in MDF stampato con una foto di famiglia",
    caption: "Portachiavi quadrato in MDF stampato, con anello e fascetta"
};

productRealPhotos["keychain-rect"] = {
    src: "assets/home/portachiavi-rettangolo.jpg",
    alt: "Portachiavi rettangolare in MDF stampato con una foto di famiglia",
    caption: "Portachiavi rettangolare in MDF stampato, con anello e fascetta"
};

productRealPhotos["keychain-heart"] = {
    src: "assets/home/portachiavi-cuore.jpg",
    alt: "Portachiavi a cuore in MDF stampato con un'illustrazione di una coppia",
    caption: "Portachiavi a cuore in MDF stampato, con anello e fascetta"
};

/* Tele: foto della tela vera della stessa misura, con una stampa d'esempio */
productRealPhotos["canvas-s"] = {
    src: "assets/home/tela-18x24-foto.jpg",
    alt: "Tela 18x24 cm su telaio con un'illustrazione natalizia",
    caption: "Tela 18x24 cm su telaio in legno"
};

productRealPhotos["canvas-m"] = {
    src: "assets/home/tela-20x30-foto.jpg",
    alt: "Tela 20x30 cm su telaio con un paesaggio di montagne al tramonto",
    caption: "Tela 20x30 cm su telaio in legno"
};

productRealPhotos["canvas-l"] = {
    src: "assets/home/tela-30x40-foto.jpg",
    alt: "Tela 30x40 cm su telaio con il ritratto di un golden retriever",
    caption: "Tela 30x40 cm su telaio in legno"
};

productRealPhotos["magnet-parchment"] = {
    src: "assets/home/calamita-pergamena-foto.jpg",
    alt: "Calamita a pergamena in MDF con la foto di una famiglia al mare",
    caption: "Calamita pergamena in MDF, con i bordi ondulati"
};


/* =========================================
   CUSCINI QUADRATI: COLORE DEL RETRO
   -----------------------------------------
   Il fronte è bianco e si stampa; il retro è in raso
   colorato e non si stampa. "photo" è la foto vera del
   retro (assets/home). Stessi colori nel plugin:
   sublimami_cushion_back_colors().
   ========================================= */
const CUSHION_BACK_COLORS = {
    red:   { label: "Rosso",       hex: "#d3122f", photo: "assets/home/cuscino-retro-rosso.jpg" },
    pink:  { label: "Rosa",        hex: "#ee5a9a", photo: "assets/home/cuscino-retro-rosa.jpg" },
    lilac: { label: "Lilla",       hex: "#a39ce6", photo: "assets/home/cuscino-retro-lilla.jpg" },
    blue:  { label: "Blu",         hex: "#0c6fd8", photo: "assets/home/cuscino-retro-blu.jpg" },
    azure: { label: "Azzurro",     hex: "#13a5d8", photo: "assets/home/cuscino-retro-azzurro.jpg" },
    aqua:  { label: "Verde acqua", hex: "#6fd3cf", photo: "assets/home/cuscino-retro-verde-acqua.jpg" },
    green: { label: "Verde",       hex: "#12a777", photo: "assets/home/cuscino-retro-verde.jpg" },
    black: { label: "Nero",        hex: "#232427", photo: "assets/home/cuscino-retro-nero.jpg" }
};

const CUSHION_BACK_DEFAULT = "red";

function hasCushionBack(productKey) {
    return productKey === "cushion" || productKey === "cushion-small";
}

function normalizeCushionBackColor(color) {
    return CUSHION_BACK_COLORS[color] ? color : CUSHION_BACK_DEFAULT;
}

/* Foto "dal vero" del prodotto. Per i cuscini quadrati è
   il retro nel colore scelto. */
function getRealPhoto(productKey) {

    if (hasCushionBack(productKey)) {

        const back =
            CUSHION_BACK_COLORS[normalizeCushionBackColor(cushionBackColor)];

        return {
            src: back.photo,
            alt: "Retro del cuscino in raso, colore " + back.label.toLowerCase(),
            caption: "Retro del cuscino: " + back.label + ". Il fronte bianco si stampa con la tua foto o scritta.",
            label: "Retro"
        };
    }

    return productRealPhotos[productKey] || null;
}


/* =========================================
   CATEGORIE DI PRODOTTO
   -----------------------------------------
   Ogni categoria raggruppa i prodotti con lo stesso
   "group" in productVariants. L'ordine qui è l'ordine
   dei pulsanti nel pannello.
   variantLabel = titolo dei pulsanti dei tipi.
   ========================================= */
const productCategories = [
    { key: "cuscini",    label: "Cuscini",         icon: "▢", variantLabel: "Tipo di cuscino" },
    { key: "tshirt",     label: "T-Shirt",         icon: "👕" },
    { key: "keychain",   label: "Portachiavi",     icon: "○", variantLabel: "Forma del portachiavi" },
    { key: "tele",       label: "Tele",            icon: "▭", variantLabel: "Misura della tela" },
    { key: "mattonelle", label: "Mattonelle",      icon: "◻", variantLabel: "Misura della mattonella" },
    { key: "ardesie",    label: "Ardesie",         icon: "⬛", variantLabel: "Forma dell'ardesia" },
    { key: "puzzle",     label: "Puzzle",          icon: "🧩", variantLabel: "Formato del puzzle" },
    { key: "calamite",   label: "Calamite",        icon: "🧲", variantLabel: "Tipo di calamita" },
    { key: "tappetini",  label: "Tappetino mouse", icon: "▬" }
];

/* Ultimo tipo scelto in ogni categoria (per riaprirlo al ritorno) */
const lastProductByCategory = {};

function getProductCategory(productKey) {
    return productVariants[productKey]
        ? productVariants[productKey].group
        : null;
}

function getCategoryProducts(categoryKey) {
    return Object.keys(productVariants).filter(function (key) {
        return (
            productVariants[key].group === categoryKey &&
            products[key]
        );
    });
}


/* =========================================
   T-SHIRT: TESSUTO, MODELLO E PREZZI
   -----------------------------------------
   Il disegno è condiviso tra cotone e poliestere
   e tra adulto e bambino: cambiano solo le opzioni
   dell'ordine (stati separati restano per Bianca/Nera).
   ========================================= */
/* fits: modelli disponibili (il bambino c'è solo in poliestere).
   formats: formati di stampa per modello (se manca: verticale e orizzontale). */
const TSHIRT_FABRICS = {
    cotton: {
        label: "100% cotone",
        colors: ["white", "black"],
        fits: ["adult"],
        formats: { adult: ["vertical"] }
    },
    polyester: {
        label: "Poliestere",
        colors: ["white"],
        fits: ["adult", "kids"]
    }
};

const TSHIRT_FITS = {
    adult: { label: "Adulto unisex" },
    kids:  { label: "Bambino" }
};

/* TAGLIE: dipendono da modello (adulto/bambino) e tessuto.
   La taglia "default" è quella proposta quando si cambia modello. */
const TSHIRT_SIZES = {
    adult: {
        cotton:    { sizes: ["S", "M", "L", "XL", "XXL"], default: "M" },
        polyester: { sizes: ["S", "M", "L", "XL", "XXL"], default: "M" }
    },
    kids: {
        polyester: {
            sizes: ["4-5 anni", "6-8 anni", "10-12 anni"],
            default: "6-8 anni"
        }
    }
};

function getTshirtSizeInfo(fabric, fit) {
    return TSHIRT_SIZES[normalizeTshirtFit(fit)][normalizeTshirtFabric(fabric)];
}

/* AREA DI STAMPA MASSIMA (cm) per tessuto e modello.
   Cotone (solo adulto): 30x40, solo verticale.
   Poliestere adulto: 30x40 verticale; in orizzontale la larghezza
   non può superare 30-31 cm, quindi 30x22,5 (stesse proporzioni).
   Poliestere bambino: 15x20 / 20x15. */
const TSHIRT_PRINT_CM = {
    cotton: {
        adult: { vertical: { width: 30, height: 40 } }
    },
    polyester: {
        adult: { vertical: { width: 30, height: 40 }, horizontal: { width: 30, height: 22.5 } },
        kids:  { vertical: { width: 15, height: 20 }, horizontal: { width: 20, height: 15 } }
    }
};

/* Misure in cm dell'area di stampa per formato verticale/orizzontale */
function getTshirtPrintCm(format, fit, fabric) {

    const byFabric =
        TSHIRT_PRINT_CM[normalizeTshirtFabric(fabric || tshirtFabric)];

    const sizes =
        byFabric[normalizeTshirtFit(fit || tshirtFit)] || byFabric.adult;

    /* Formato non previsto (es. cotone in orizzontale): verticale */
    const cm =
        format === "horizontal" && sizes.horizontal
            ? sizes.horizontal
            : sizes.vertical;

    return { width: cm.width, height: cm.height };
}

/*
    Scala del riquadro tratteggiato: la maglia disegnata ha la larghezza
    reale della tabella taglie Roly (misura in piano): adulto M 51 cm,
    bambino 7/8 anni 38 cm. Il busto della sagoma è largo 143 px sul
    computer (sagoma 460 px); su smartphone la sagoma è 70/95 più piccola.
*/
const TSHIRT_REFERENCE_WIDTH_CM = { adult: 51, kids: 38 };
const TSHIRT_MOCKUP_TORSO_PX = 143;
const TSHIRT_MOBILE_SCALE = 70 / 95;

function getTshirtPrintAreaPx(format, isMobile, fit, fabric) {

    const fitKey = normalizeTshirtFit(fit || tshirtFit);

    const pxPerCm =
        (TSHIRT_MOCKUP_TORSO_PX / TSHIRT_REFERENCE_WIDTH_CM[fitKey]) *
        (isMobile ? TSHIRT_MOBILE_SCALE : 1);

    const cm = getTshirtPrintCm(format, fitKey, fabric);

    const exactWidth = cm.width * pxPerCm;
    const exactHeight = cm.height * pxPerCm;

    /* px interi = area utile del riquadro (il bordo tratteggiato sta fuori);
       base* restano esatti per il cambio di scala computer/smartphone */
    return {
        width: Math.round(exactWidth),
        height: Math.round(exactHeight),
        baseWidth: exactWidth,
        baseHeight: exactHeight
    };
}

/*
    Posizione verticale del riquadro: il bordo alto sta sotto il collo,
    a 9 cm sull'adulto e 8 cm sul bambino (fronte e retro).
    Collo misurato sulle sagome 768x512 (px dall'alto, al centro):
    fronte cotone 46, fronte poliestere 39, retro 12 (bordo del colletto).
    Restituisce il "top" in % del contenitore (il riquadro è centrato
    con translate(-50%, -50%)).
*/
const TSHIRT_MOCKUP_PX = { width: 768, height: 512, torso: 239 };
const TSHIRT_NECK_Y_PX = {
    cotton:    { front: 46, back: 12 },
    polyester: { front: 39, back: 12 }
};
const TSHIRT_COLLAR_GAP_CM = { adult: 9, kids: 8 };

function getTshirtPrintCenterPercent(side, boxWidth, boxHeight, areaHeightPx, fit, fabric) {

    const fitKey = normalizeTshirtFit(fit || tshirtFit);
    const fabricKey = normalizeTshirtFabric(fabric || tshirtFabric);

    /* La sagoma è disegnata con background-size: contain, centrata */
    const scale = Math.min(
        boxWidth / TSHIRT_MOCKUP_PX.width,
        boxHeight / TSHIRT_MOCKUP_PX.height
    );

    const imageTop =
        (boxHeight - TSHIRT_MOCKUP_PX.height * scale) / 2;

    const neckY =
        imageTop +
        TSHIRT_NECK_Y_PX[fabricKey][side === "back" ? "back" : "front"] * scale;

    /* Stessa scala del riquadro: larghezza reale della maglia */
    const pxPerCm =
        (TSHIRT_MOCKUP_PX.torso * scale) /
        TSHIRT_REFERENCE_WIDTH_CM[fitKey];

    const top = neckY + TSHIRT_COLLAR_GAP_CM[fitKey] * pxPerCm;

    return ((top + areaHeightPx / 2) / boxHeight) * 100;
}

function formatTshirtPrintCm(format, fit, fabric) {
    const cm = getTshirtPrintCm(format, fit, fabric);
    return formatCm(cm.width) + "x" + formatCm(cm.height);
}

/* PREZZI T-SHIRT: scrivi il prezzo (es. 12.50).
   null = "Prezzo da definire" (non si può ancora aggiungere al carrello) */
const TSHIRT_PRICES = {
    cotton:    { adult: 15.00 },
    polyester: { adult: 15.00, kids: 15.00 }
};

/* SUPPLEMENTI (solo cotone): il prezzo base vale per un lato con
   sole scritte. +5 € se si stampano fronte e retro, +5 € se c'è
   almeno una foto o immagine (su uno o su entrambi i lati).
   Esempi: fronte scritte 15, fronte e retro scritte 20,
   foto su un lato 20, foto + scritte sull'altro lato 25,
   foto su fronte e retro 25.
   Stessi importi nel plugin: sublimami_tshirt_extras(). */
const TSHIRT_EXTRAS = {
    cotton: { secondSide: 5.00, photos: 5.00 }
};

/* Modelli e formati disponibili per tessuto */
function isTshirtFitAvailable(fabric, fit) {
    return TSHIRT_FABRICS[normalizeTshirtFabric(fabric)].fits.indexOf(fit) !== -1;
}

function getTshirtFormats(fabric, fit) {

    const fabricData =
        TSHIRT_FABRICS[normalizeTshirtFabric(fabric || tshirtFabric)];

    const fitKey =
        normalizeTshirtFit(fit || tshirtFit);

    return (fabricData.formats && fabricData.formats[fitKey]) ||
        ["vertical", "horizontal"];
}

/* Cotone e bambino non esistono insieme; i formati non disponibili
   tornano verticali (anche per i vecchi salvataggi) */
function normalizeTshirtVariantState() {

    tshirtFabric = normalizeTshirtFabric(tshirtFabric);
    tshirtFit = normalizeTshirtFit(tshirtFit);

    if (!isTshirtFitAvailable(tshirtFabric, tshirtFit)) {
        tshirtFabric = "polyester";
    }

    if (!tshirtPrintFormat || typeof tshirtPrintFormat !== "object") {
        tshirtPrintFormat = { front: "vertical", back: "vertical" };
    }

    const formats = getTshirtFormats(tshirtFabric, tshirtFit);

    ["front", "back"].forEach(function (side) {
        if (formats.indexOf(tshirtPrintFormat[side]) === -1) {
            tshirtPrintFormat[side] = "vertical";
        }
    });
}

/* Un lato ha foto o immagini visibili? */
function hasImageContent(state) {
    return Boolean(
        state &&
        Array.isArray(state.images) &&
        state.images.some(function (imageState) {
            return imageState.visible !== false;
        })
    );
}

/* Cosa c'è da stampare su fronte e retro (stati di un colore,
   oppure di un articolo del carrello) */
function getTshirtPrintInfo(frontState, backState) {
    return {
        front: {
            printed: hasPrintContent(frontState),
            photos: hasPrintContent(frontState) && hasImageContent(frontState)
        },
        back: {
            printed: hasPrintContent(backState),
            photos: hasPrintContent(backState) && hasImageContent(backState)
        }
    };
}

function getTshirtExtras(fabric, info) {

    const rule = TSHIRT_EXTRAS[normalizeTshirtFabric(fabric)];
    const extras = { secondSide: 0, photos: 0, total: 0 };

    if (!rule || !info) {
        return extras;
    }

    if (info.front.printed && info.back.printed) {
        extras.secondSide = rule.secondSide;
    }

    if (info.front.photos || info.back.photos) {
        extras.photos = rule.photos;
    }

    extras.total = extras.secondSide + extras.photos;

    return extras;
}

/* Fronte e retro della T-shirt in modifica */
function getCurrentTshirtPrintInfo() {

    const states =
        productStates.tshirt && productStates.tshirt[tshirtColor];

    return getTshirtPrintInfo(
        states && states.front,
        states && states.back
    );
}

function normalizeTshirtFabric(value) {
    return TSHIRT_FABRICS[value] ? value : "cotton";
}

function normalizeTshirtFit(value) {
    return TSHIRT_FITS[value] ? value : "adult";
}

function getTshirtPrice(fabric, fit) {

    const row = TSHIRT_PRICES[normalizeTshirtFabric(fabric)];
    const price = row ? row[normalizeTshirtFit(fit)] : null;

    return typeof price === "number" ? price : null;
}

/* Prezzo "a partire da" di un tessuto (per le schede su mobile) */
function getTshirtPriceFrom(fabric) {

    const prices = Object.keys(TSHIRT_FITS)
        .map(function (fit) {
            return getTshirtPrice(fabric, fit);
        })
        .filter(function (price) {
            return typeof price === "number";
        });

    return prices.length ? Math.min.apply(null, prices) : null;
}

function getTshirtVariantLabel(fabric, fit) {
    return (
        "T-Shirt " +
        TSHIRT_FABRICS[normalizeTshirtFabric(fabric)].label +
        " · " +
        TSHIRT_FITS[normalizeTshirtFit(fit)].label
    );
}

/* Prezzo del prodotto attualmente in modifica */
function getCurrentUnitPrice() {

    if (currentProduct === "tshirt") {

        const base = getTshirtPrice(tshirtFabric, tshirtFit);

        if (typeof base !== "number") {
            return null;
        }

        /* Cotone: +5 € fronte e retro, +5 € con le foto */
        return base +
            getTshirtExtras(tshirtFabric, getCurrentTshirtPrintInfo()).total;
    }

    const price = products[currentProduct].price;

    return typeof price === "number" ? price : null;
}


/* T-shirt: prezzo aggiornato mentre si aggiungono foto e scritte,
   con la spiegazione dei supplementi (solo cotone) */
function updateTshirtPriceDisplay() {

    const note = document.getElementById("productPriceNote");

    if (currentProduct !== "tshirt") {
        if (note) {
            note.hidden = true;
        }

        const mobilePrice = document.getElementById("mobileTshirtPrice");

        if (mobilePrice) {
            mobilePrice.hidden = true;
        }
        return;
    }

    const unitPrice = getCurrentUnitPrice();

    productPrice.textContent = formatProductPrice(unitPrice);

    productPrice.classList.toggle(
        "price-pending",
        typeof unitPrice !== "number"
    );

    if (!note) {
        return;
    }

    const rule = TSHIRT_EXTRAS[normalizeTshirtFabric(tshirtFabric)];

    if (!rule || typeof unitPrice !== "number") {
        note.hidden = true;

        const mobilePrice = document.getElementById("mobileTshirtPrice");

        if (mobilePrice) {
            mobilePrice.hidden = true;
        }
        return;
    }

    const extras =
        getTshirtExtras(tshirtFabric, getCurrentTshirtPrintInfo());

    const parts = [];

    if (extras.secondSide) {
        parts.push("fronte e retro +" + formatProductPrice(extras.secondSide));
    }

    if (extras.photos) {
        parts.push("foto +" + formatProductPrice(extras.photos));
    }

    /* Su smartphone il prezzo sta accanto a Fronte / Retro */
    const mobilePrice = document.getElementById("mobileTshirtPrice");

    if (mobilePrice) {
        mobilePrice.textContent = formatProductPrice(unitPrice);
        mobilePrice.title = parts.length
            ? "Compreso: " + parts.join(", ")
            : "Prezzo con scritte su un lato";
        mobilePrice.hidden = false;
    }

    note.textContent = parts.length
        ? "Compreso: " + parts.join(", ") + "."
        : "Prezzo con scritte su un lato. Fronte e retro +" +
            formatProductPrice(rule.secondSide) +
            ", con foto +" +
            formatProductPrice(rule.photos) + ".";

    note.hidden = false;
}


/* Prodotti "semplici" (un solo lato), compresi cuscino e portachiavi */
function isSingleSideProduct(productKey) {
    return productKey !== "tshirt";
}


/* Prezzo formattato; se manca mostra "Prezzo da definire" */
function formatProductPrice(price) {

    if (typeof price !== "number") {
        return "Prezzo da definire";
    }

    return `€${price.toFixed(2).replace(".", ",")}`;
}


/* =========================================
   ORIENTAMENTO (tele e mattonella 15x20)
   -----------------------------------------
   L'orientamento scelto è salvato nello stato
   del prodotto (state.orientation), così resta
   anche dopo il ricaricamento e con annulla/ripristina.
   ========================================= */

function getBaseOrientation(product) {
    return product.printCm.height >= product.printCm.width
        ? "vertical"
        : "horizontal";
}

function getProductOrientation(productKey) {

    const product = products[productKey];

    if (!product || !product.orientable) {
        return null;
    }

    const state =
        productStates[productKey] &&
        productStates[productKey].front;

    if (
        state &&
        (state.orientation === "vertical" ||
            state.orientation === "horizontal")
    ) {
        return state.orientation;
    }

    return getBaseOrientation(product);
}

/* Misure orientate: se serve scambia larghezza e altezza */
function orientSize(size, product, orientation) {

    if (
        !orientation ||
        orientation === getBaseOrientation(product)
    ) {
        return { width: size.width, height: size.height };
    }

    return { width: size.height, height: size.width };
}

function getOrientedPrintCm(productKey) {

    const product = products[productKey];

    return orientSize(
        product.printCm,
        product,
        getProductOrientation(productKey)
    );
}

function formatCm(value) {
    return String(value).replace(".", ",");
}

/* Testi dell'area di stampa aggiornati con l'orientamento */
function getOrientedPrintTexts(productKey) {

    const product = products[productKey];

    /* T-Shirt: misure diverse per tessuto e modello */
    if (productKey === "tshirt") {

        const vertical = formatTshirtPrintCm("vertical");
        const horizontal = formatTshirtPrintCm("horizontal");

        /* Cotone: solo verticale */
        if (getTshirtFormats().indexOf("horizontal") === -1) {
            return {
                print: `Area massima di stampa: ${vertical} cm, in verticale`,
                printInfo: `Stampa fino a ${vertical} cm (verticale)`
            };
        }

        return {
            print: `Area massima di stampa: ${vertical} cm in verticale o ${horizontal} cm in orizzontale`,
            printInfo: `Stampa fino a ${vertical} cm (verticale) o ${horizontal} cm (orizzontale)`
        };
    }

    if (!product.orientable || !product.nominal) {
        return {
            print: product.print,
            printInfo: product.printInfo
        };
    }

    const size = orientSize(
        product.nominal,
        product,
        getProductOrientation(productKey)
    );

    const label =
        `${formatCm(size.width)}x${formatCm(size.height)} cm`;

    if (product.marginNote === "keychain") {

        const printSize = getOrientedPrintCm(productKey);

        const printLabel =
            `${formatCm(printSize.width)}x${formatCm(printSize.height)} cm`;

        return {
            print: `Area di stampa: ${printLabel} (0,2 cm di scarto oltre il tratteggio)`,
            printInfo: `Tratteggio = linea di taglio · stampa fino a ${printLabel}`
        };
    }

    /* Ardesia: il bordo in pietra non prende la stampa */
    if (product.marginNote === "slate") {
        return {
            print: `Area di stampa: ${label} (il bordo in pietra non si stampa)`,
            printInfo: `Area stampabile ${label} · bordo in pietra`
        };
    }

    /* Calamita pergamena: i bordi ondulati tagliano un po' l'immagine */
    if (product.marginNote === "parchment") {
        return {
            print: `Area di stampa: ${label} (i bordi ondulati tagliano un po' l'immagine)`,
            printInfo: `Area stampabile ${label} · bordi a pergamena`
        };
    }

    /* Puzzle: nessun margine */
    if (product.marginNote === "none") {
        return {
            print: `Area di stampa: ${label}`,
            printInfo: `Area stampabile ${label}`
        };
    }

    const margin =
        product.marginNote === "canvas"
            ? " + 0,5 cm di margine per lato"
            : " + margine di taglio";

    return {
        print: `Area di stampa: ${label}${margin}`,
        printInfo: `Area stampabile ${label} (con margine)`
    };
}


/*
    Sul sito WordPress i prezzi arrivano dai prodotti WooCommerce,
    così configuratore e negozio mostrano sempre lo stesso prezzo.
    - prices: chiave prodotto -> prezzo (un prodotto senza prezzo
      nel negozio resta "Prezzo da definire").
    - tshirtPrices: tessuto -> modello -> prezzo.
*/
(function applyShopPrices() {

    const config =
        window.SUBLIMAMI_CONFIG;

    if (!config) {
        return;
    }

    if (config.prices) {

        Object.keys(products).forEach(function (productKey) {

            const shopPrice =
                Number(config.prices[productKey]);

            products[productKey].price =
                shopPrice > 0 ? shopPrice : null;
        });
    }

    if (config.tshirtPrices) {

        Object.keys(TSHIRT_PRICES).forEach(function (fabric) {

            Object.keys(TSHIRT_PRICES[fabric]).forEach(function (fit) {

                const shopPrice =
                    Number(
                        config.tshirtPrices[fabric] &&
                        config.tshirtPrices[fabric][fit]
                    );

                TSHIRT_PRICES[fabric][fit] =
                    shopPrice > 0 ? shopPrice : null;
            });
        });
    }
})();


function createImageState(src) {

    return {
        id:
            "img-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .slice(2, 9),

        src: src,

        x: 0,
        y: 0,

        scale: 1,
        rotation: 0,

        flipped: false,

layer: 1,

visible: true
    };
}

function createTextState(text = "") {

    return {

        id:
            "text-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .slice(2, 9),

        text:
            text,

        x: 0,
        y: 0,

        size: 26,
        rotation: 0,

        fontFamily:
            "Arial",

        color:
            "#000000",

        outlineEnabled:
            false,

        outlineColor:
            "#ffffff",

        outlineWidth:
            1,

        bold:
            false,

        italic:
            false,

        align:
            "center",

        flipped:
            false,

        layer:
            2,

        visible:
            true
    };
}

function createEmptyState() {

    return {
    imageSrc: "",
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    imageFlipped: false,
    imageLayer: 1,
    images: [],
selectedImageId: null,

    text: "",
    textX: 0,
    textY: 0,
    textSize: 26,
    textRotation: 0,
    fontFamily: "Arial",
    textColor: "#000000",
    textOutlineEnabled: false,
textOutlineColor: "#ffffff",
textOutlineWidth: 1,
    textBold: false,
    textItalic: false,
    textAlign: "center",
    textFlipped: false,
textLayer: 2,
textVisible: true,

texts: [],
selectedTextId: null,

printBgEnabled: false,
    printBgColor: "#ffffff"
};
}

function createCartStateCopy(state) {

    let images = [];


    if (
        Array.isArray(state.images) &&
        state.images.length > 0
    ) {

        images =
            state.images.map(
                function (imageState) {

                    return {
                        id:
                            imageState.id,

                        src:
                            imageState.src,

                        x:
                            imageState.x,

                        y:
                            imageState.y,

                        scale:
                            imageState.scale,

                        rotation:
                            imageState.rotation,

                        flipped:
                            imageState.flipped,

                        layer:
                            imageState.layer,

                        visible:
                            imageState.visible !== false
                    };
                }
            );

    } else if (state.imageSrc) {

        images.push({
            id:
                "legacy-image",

            src:
                state.imageSrc,

            x:
                state.x,

            y:
                state.y,

            scale:
                state.scale,

            rotation:
                state.rotation,

            flipped:
                state.imageFlipped,

            layer:
                state.imageLayer,

            visible:
                true
        });
    }


    /*
        TESTI MULTIPLI
    */
    let texts = [];


    if (
        Array.isArray(state.texts) &&
        state.texts.length > 0
    ) {

        texts =
            state.texts.map(
                function (textState) {

                    return {
                        id:
                            textState.id,

                        text:
                            textState.text,

                        x:
                            textState.x,

                        y:
                            textState.y,

                        size:
                            textState.size,

                        rotation:
                            textState.rotation,

                        fontFamily:
                            textState.fontFamily,

                        color:
                            textState.color,

                        outlineEnabled:
                            textState.outlineEnabled,

                        outlineColor:
                            textState.outlineColor,

                        outlineWidth:
                            textState.outlineWidth,

                        bold:
                            textState.bold,

                        italic:
                            textState.italic,

                        align:
                            textState.align,

                        flipped:
                            textState.flipped,

                        layer:
                            textState.layer,

                        visible:
                            textState.visible !== false
                    };
                }
            );

    } else if (
        state.text &&
        state.text.trim()
    ) {

        /*
            Compatibilità con vecchie
            personalizzazioni a testo singolo.
        */
        texts.push({
            id:
                "legacy-text",

            text:
                state.text,

            x:
                state.textX,

            y:
                state.textY,

            size:
                state.textSize,

            rotation:
                state.textRotation,

            fontFamily:
                state.fontFamily,

            color:
                state.textColor,

            outlineEnabled:
                state.textOutlineEnabled,

            outlineColor:
                state.textOutlineColor,

            outlineWidth:
                state.textOutlineWidth,

            bold:
                state.textBold,

            italic:
                state.textItalic,

            align:
                state.textAlign,

            flipped:
                state.textFlipped,

            layer:
                state.textLayer,

            visible:
                state.textVisible !== false
        });
    }


    return {

        images:
            images,

        texts:
            texts,

        printBgEnabled:
            state.printBgEnabled,

        printBgColor:
            state.printBgColor
    };
}

/*
    ============================
    SALVATAGGIO CONFIGURATORE
    ============================
*/

/*
    Progetto e carrello vengono salvati in IndexedDB
    tramite storage.js (window.appStorage), perché le
    foto superano lo spazio di localStorage.
    Se storage.js non è presente usiamo localStorage.
*/
const configuratorStorage =
    window.appStorage || {

        getItem: function (key) {
            try {
                return localStorage.getItem(key);
            } catch (error) {
                return null;
            }
        },

        setItem: function (key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (error) {
                console.warn(
                    "Impossibile salvare i dati del configuratore:",
                    error
                );
            }
        }
    };

const CONFIGURATOR_STORAGE_KEY =
    "mycustomConfigurator";


function saveConfiguratorState() {

    /*
        Prima di salvare sincronizziamo
        gli elementi attualmente selezionati.
    */
    syncSelectedImageFromLegacyState();
    syncSelectedTextFromLegacyState();


    const configuratorData = {

        currentProduct:
            currentProduct,

        tshirtColor:
            tshirtColor,

        tshirtSize:
            tshirtSize,

        tshirtFabric:
            tshirtFabric,

        tshirtFit:
            tshirtFit,

        tshirtSide:
            tshirtSide,

        tshirtPrintFormat:
            tshirtPrintFormat,

        cushionBackColor:
            cushionBackColor,

        productStates:
            productStates
    };


    try {

        configuratorStorage.setItem(
            CONFIGURATOR_STORAGE_KEY,
            JSON.stringify(configuratorData)
        );

    } catch (error) {

        console.warn(
            "Impossibile salvare il configuratore:",
            error
        );
    }
}

function loadConfiguratorState() {

    const savedData =
        configuratorStorage.getItem(
            CONFIGURATOR_STORAGE_KEY
        );


    if (!savedData) {
        return null;
    }


    try {

        return JSON.parse(
            savedData
        );

    } catch (error) {

        console.warn(
            "Impossibile caricare il configuratore:",
            error
        );

        return null;
    }
}

let productStates = {

    cushion: {
        front: createEmptyState()
    },

    tshirt: {

    white: {
        front: createEmptyState(),
        back: createEmptyState()
    },

    black: {
        front: createEmptyState(),
        back: createEmptyState()
    }

},

    keychain: {
        front: createEmptyState()
    }

};

/* Uno stato indipendente per ogni nuovo prodotto */
Object.keys(products).forEach(function (productKey) {
    if (!productStates[productKey]) {
        productStates[productKey] = {
            front: createEmptyState()
        };
    }
});

/*
    Recuperiamo un eventuale
    progetto salvato.
*/
const savedConfigurator =
    loadConfiguratorState();


if (
    savedConfigurator &&
    savedConfigurator.productStates
) {

    const savedProductStates =
    savedConfigurator.productStates;

/*
    Recuperiamo normalmente
    Cuscino e Portachiavi.
*/
if (savedProductStates.cushion) {
    productStates.cushion =
        savedProductStates.cushion;
}

if (savedProductStates.keychain) {
    productStates.keychain =
        savedProductStates.keychain;
}

/* Nuovi prodotti salvati in precedenza */
Object.keys(products).forEach(function (productKey) {
    if (
        productKey !== "tshirt" &&
        productKey !== "cushion" &&
        productKey !== "keychain" &&
        savedProductStates[productKey] &&
        savedProductStates[productKey].front
    ) {
        productStates[productKey] =
            savedProductStates[productKey];
    }
});

/*
    T-SHIRT

    Se il salvataggio possiede già
    white e black utilizziamo
    la nuova struttura.

    Se invece troviamo front/back
    direttamente dentro tshirt,
    significa che è un vecchio
    salvataggio: lo conserviamo
    come personalizzazione Bianca.
*/
if (savedProductStates.tshirt) {

    if (
        savedProductStates.tshirt.white &&
        savedProductStates.tshirt.black
    ) {

        productStates.tshirt =
            savedProductStates.tshirt;

    } else {

        if (savedProductStates.tshirt.front) {
            productStates.tshirt.white.front =
                savedProductStates.tshirt.front;
        }

        if (savedProductStates.tshirt.back) {
            productStates.tshirt.white.back =
                savedProductStates.tshirt.back;
        }
    }
}

            if (savedConfigurator.currentProduct) {
        currentProduct =
            savedConfigurator.currentProduct;
    }

    /* Il portachiavi 4,5x4,5 non è più in vendita */
    if (currentProduct === "keychain") {
        currentProduct = "keychain-square";
    }

    if (savedConfigurator.tshirtColor) {
        tshirtColor =
            savedConfigurator.tshirtColor;
    }

    if (savedConfigurator.tshirtSize) {
        tshirtSize =
            savedConfigurator.tshirtSize;
    }

    /* Tessuto e modello (i vecchi salvataggi non li hanno:
       restano 100% cotone e adulto) */
    tshirtFabric =
        normalizeTshirtFabric(savedConfigurator.tshirtFabric);

    tshirtFit =
        normalizeTshirtFit(savedConfigurator.tshirtFit);

    if (savedConfigurator.tshirtSide) {
        tshirtSide =
            savedConfigurator.tshirtSide;
    }

    if (savedConfigurator.tshirtPrintFormat) {
        tshirtPrintFormat =
            savedConfigurator.tshirtPrintFormat;
    }

    /* Regole nuove: cotone solo adulto e solo verticale */
    normalizeTshirtVariantState();

    /* I vecchi salvataggi non hanno il colore del retro */
    cushionBackColor =
        normalizeCushionBackColor(savedConfigurator.cushionBackColor);
}

/* Portachiavi in MDF: anche il retro ha il suo stato */
Object.keys(products).forEach(function (productKey) {
    if (
        isDoubleSidedProduct(productKey) &&
        productStates[productKey] &&
        !productStates[productKey].back
    ) {
        productStates[productKey].back = createEmptyState();
    }
});

/*
    ============================
    AUTOSALVATAGGIO
    ============================
*/

setInterval(
    function () {

        saveConfiguratorState();

    },
    1000
);

/*
    ============================
    ANNULLA / RIPRISTINA
    ============================
*/

const HISTORY_LIMIT = 20;

let undoStack = [];
let redoStack = [];

let isRestoringHistory = false;


/*
    Crea una fotografia completa
    dello stato del configuratore.
*/
function createHistorySnapshot() {

    syncSelectedImageFromLegacyState();
    syncSelectedTextFromLegacyState();

    return JSON.stringify({
        productStates: productStates,
        currentProduct: currentProduct,
        tshirtColor: tshirtColor,
        tshirtSize: tshirtSize,
        tshirtFabric: tshirtFabric,
        tshirtFit: tshirtFit,
        tshirtSide: tshirtSide,
        tshirtPrintFormat: tshirtPrintFormat
    });
}


/*
    Registra lo stato PRIMA
    di effettuare una modifica.
*/
function saveHistoryState() {

    if (isRestoringHistory) {
        return;
    }

    const snapshot =
        createHistorySnapshot();

    /*
        Evitiamo di salvare due
        stati consecutivi identici.
    */
    if (
        undoStack.length > 0 &&
        undoStack[
            undoStack.length - 1
        ] === snapshot
    ) {
        return;
    }

    undoStack.push(snapshot);

    /*
        Manteniamo al massimo
        HISTORY_LIMIT stati.
    */
    if (
        undoStack.length >
        HISTORY_LIMIT
    ) {
        undoStack.shift();
    }

    /*
        Una nuova modifica rende
        non più valida la cronologia
        del Ripristina.
    */
    redoStack = [];

    updateHistoryButtons();
}

function updateHistoryButtons() {

    const undoDisabled =
        undoStack.length === 0;

    const redoDisabled =
        redoStack.length === 0;


    undoButton.disabled =
        undoDisabled;

    redoButton.disabled =
        redoDisabled;


    if (mobileUndoButton) {
        mobileUndoButton.disabled =
            undoDisabled;
    }

    if (mobileRedoButton) {
        mobileRedoButton.disabled =
            redoDisabled;
    }
}


function restoreHistorySnapshot(snapshot) {

    const data =
        JSON.parse(snapshot);

    isRestoringHistory = true;

    productStates =
        data.productStates;

    currentProduct =
        data.currentProduct;

    tshirtColor =
        data.tshirtColor;

    tshirtSize =
        data.tshirtSize;

    tshirtFabric =
        normalizeTshirtFabric(data.tshirtFabric);

    tshirtFit =
        normalizeTshirtFit(data.tshirtFit);

    tshirtSide =
        data.tshirtSide;

    tshirtPrintFormat =
        data.tshirtPrintFormat;

    normalizeTshirtVariantState();

    selectedElementType = null;

    selectionControls.style.display =
        "none";

    productSelect.value =
        currentProduct;

    updateProductPreview();
        /*
        Sincronizziamo anche i pulsanti
        Verticale / Orizzontale con
        il formato appena ripristinato.
    */
    if (currentProduct === "tshirt") {

        document
            .querySelectorAll(".print-format-button")
            .forEach(function (button) {

                button.classList.toggle(
                    "active",
                    button.dataset.format ===
                        tshirtPrintFormat[tshirtSide]
                );
            });

        updateTshirtPrintFormat();
    }
    updatePreviewZoom();

    isRestoringHistory = false;
}


function undoHistory() {

    if (undoStack.length === 0) {
        return;
    }

    const currentSnapshot =
        createHistorySnapshot();

    redoStack.push(
        currentSnapshot
    );

    const previousSnapshot =
        undoStack.pop();

    restoreHistorySnapshot(
        previousSnapshot
    );

    updateHistoryButtons();
}


function redoHistory() {

    if (redoStack.length === 0) {
        return;
    }

    const currentSnapshot =
        createHistorySnapshot();

    undoStack.push(
        currentSnapshot
    );

    const nextSnapshot =
        redoStack.pop();

    restoreHistorySnapshot(
        nextSnapshot
    );

    updateHistoryButtons();
}


undoButton.addEventListener(
    "click",
    function () {

        undoHistory();
    }
);


redoButton.addEventListener(
    "click",
    function () {

        redoHistory();
    }
);

let cartItems = JSON.parse(
    configuratorStorage.getItem("mycustomCart")
) || [];


function getCurrentSide() {

    if (currentProduct === "tshirt") {
        return tshirtSide;
    }

    if (isDoubleSidedProduct(currentProduct)) {
        return keychainSide;
    }

    return "front";
}

function getSelectedImageState() {

    const state =
        getCurrentState();

    if (!state.selectedImageId) {
        return null;
    }

    return (
        state.images.find(
            function (image) {
                return (
                    image.id ===
                    state.selectedImageId
                );
            }
        ) || null
    );
}


function setSelectedImage(imageId) {

    const state =
        getCurrentState();

    state.selectedImageId =
        imageId;
}

function getSelectedTextState() {

    const state =
        getCurrentState();


    if (!state.selectedTextId) {
        return null;
    }


    return (
        state.texts.find(
            function (textState) {

                return (
                    textState.id ===
                    state.selectedTextId
                );
            }
        ) || null
    );
}


function setSelectedText(textId) {

    const state =
        getCurrentState();

    state.selectedTextId =
        textId;
}


function getHighestContentLayer() {

    const state =
        getCurrentState();


    const layers = [
        ...state.images.map(
            function (imageState) {
                return imageState.layer;
            }
        ),

        ...state.texts.map(
            function (textState) {
                return textState.layer;
            }
        )
    ];


    if (layers.length === 0) {
        return 0;
    }


    return Math.max(
        ...layers
    );
}


function loadSelectedTextIntoLegacyState() {

    const state =
        getCurrentState();


    if (
        !Array.isArray(state.texts) ||
        state.texts.length === 0
    ) {
        return null;
    }


    let textState =
        getSelectedTextState();


    if (!textState) {

        textState =
            state.texts[
                state.texts.length - 1
            ];

        state.selectedTextId =
            textState.id;
    }


    state.text =
        textState.text;

    state.textX =
        textState.x;

    state.textY =
        textState.y;

    state.textSize =
        textState.size;

    state.textRotation =
        textState.rotation;

    state.fontFamily =
        textState.fontFamily;

    state.textColor =
        textState.color;

    state.textOutlineEnabled =
        textState.outlineEnabled;

    state.textOutlineColor =
        textState.outlineColor;

    state.textOutlineWidth =
        textState.outlineWidth;

    state.textBold =
        textState.bold;

    state.textItalic =
        textState.italic;

    state.textAlign =
        textState.align;

    state.textFlipped =
        textState.flipped;

    state.textLayer =
        textState.layer;

    state.textVisible =
        textState.visible;


    return textState;
}


function syncSelectedTextFromLegacyState() {

    const state =
        getCurrentState();

    const textState =
        getSelectedTextState();


    if (!textState) {
        return;
    }


    textState.text =
        state.text;

    textState.x =
        state.textX;

    textState.y =
        state.textY;

    textState.size =
        state.textSize;

    textState.rotation =
        state.textRotation;

    textState.fontFamily =
        state.fontFamily;

    textState.color =
        state.textColor;

    textState.outlineEnabled =
        state.textOutlineEnabled;

    textState.outlineColor =
        state.textOutlineColor;

    textState.outlineWidth =
        state.textOutlineWidth;

    textState.bold =
        state.textBold;

    textState.italic =
        state.textItalic;

    textState.align =
        state.textAlign;

    textState.flipped =
        state.textFlipped;

    textState.layer =
        state.textLayer;

    textState.visible =
        state.textVisible;
}


function createNewText() {

    const state =
        getCurrentState();


    /*
        Salviamo prima la scritta
        che stavamo modificando.
    */
    syncSelectedTextFromLegacyState();

    /*
    Salviamo lo stato prima
    di creare una nuova scritta.
*/
saveHistoryState();


    const textState =
        createTextState("");


    textState.layer =
        getHighestContentLayer() + 1;


    state.texts.push(textState);
state.selectedTextId = textState.id;

/*
    Ricordiamo che questa scritta
    è appena stata creata.
*/
newlyCreatedTextId = textState.id;

loadSelectedTextIntoLegacyState();

return textState;
}

function createMultiTextElement(
    textState
) {

    const element =
        document.createElement(
            "div"
        );


    element.className =
        "multi-custom-text";

    element.dataset.textId =
        textState.id;

    element.textContent =
        textState.text;


    textsLayer.appendChild(
        element
    );


    return element;
}


function applyTextStateToElement(
    element,
    textState
) {

    const scaleX =
        textState.flipped
            ? -1
            : 1;


    element.style.fontSize =
        `${textState.size}px`;

    element.style.fontFamily =
        textState.fontFamily;

    element.style.color =
        textState.color;

    element.style.fontWeight =
        textState.bold
            ? "700"
            : "400";

    element.style.fontStyle =
        textState.italic
            ? "italic"
            : "normal";

    element.style.textAlign =
        textState.align ||
        "center";


    element.style.webkitTextStroke =
        textState.outlineEnabled
            ? `${textState.outlineWidth}px ${textState.outlineColor}`
            : "0px transparent";


    element.style.transform =
        `translate(
            calc(-50% + ${textState.x}px),
            calc(-50% + ${textState.y}px)
        )
        rotate(${textState.rotation}deg)
        scaleX(${scaleX})`;


    element.style.zIndex =
        textState.layer;


    element.style.display =
        textState.visible === false
            ? "none"
            : "block";
}


function renderMultiTexts() {

    const state =
        getCurrentState();


    textsLayer.innerHTML =
        "";


    state.texts.forEach(
        function (textState) {

            /*
                La scritta selezionata
                viene mostrata dal vecchio
                customText.
            */
            if (
                textState.id ===
                state.selectedTextId
            ) {
                return;
            }


            if (!textState.text) {
                return;
            }


            const element =
                createMultiTextElement(
                    textState
                );


            applyTextStateToElement(
                element,
                textState
            );


            element.addEventListener(
    "pointerdown",
    function (event) {

                    event.preventDefault();
                    event.stopPropagation();


                    /*
                        Salviamo prima
                        la scritta attuale.
                    */
                    syncSelectedTextFromLegacyState();


                    setSelectedText(
                        textState.id
                    );


                    loadSelectedTextIntoLegacyState();


                    selectedElementType =
                        "text";


                    renderCurrentState();


                    requestAnimationFrame(
                        function () {

                            showSelectionControls(
                                customText,
                                "text"
                            );
                        }
                    );
                }
            );
        }
    );
}

function createImageElement(imageState) {

    const imageElement =
        document.createElement("img");

    imageElement.className =
        "multi-uploaded-image";

    imageElement.dataset.imageId =
        imageState.id;

    imageElement.src =
        imageState.src;

    imageElement.alt = "";

    imageElement.draggable = false;

    imagesLayer.appendChild(
        imageElement
    );

    return imageElement;
}

function applyImageStateToElement(
    imageElement,
    imageState
) {

    const scaleX =
        imageState.flipped
            ? -imageState.scale
            : imageState.scale;

    imageElement.style.transform =
        `translate(
            calc(-50% + ${imageState.x}px),
            calc(-50% + ${imageState.y}px)
        )
        scale(
            ${scaleX},
            ${imageState.scale}
        )
        rotate(${imageState.rotation}deg)`;

    imageElement.style.zIndex =
        imageState.layer;
        imageElement.style.display =
    imageState.visible === false
        ? "none"
        : "block";
}

function renderMultiImages() {

    const state =
        getCurrentState();

    imagesLayer.innerHTML = "";

    state.images.forEach(
        function (imageState) {

            /*
                La foto selezionata viene mostrata
                dalla vecchia uploadedImage.

                In questo modo possiamo continuare
                a usare tutti i controlli già
                funzionanti senza mostrare
                la stessa foto due volte.
            */
            if (
                imageState.id ===
                state.selectedImageId
            ) {
                return;
            }

            const imageElement =
                createImageElement(
                    imageState
                );

            applyImageStateToElement(
                imageElement,
                imageState
            );


            imageElement.addEventListener(
    "pointerdown",
    function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    setSelectedImage(
                        imageState.id
                    );

                    loadSelectedImageIntoLegacyState();

                    renderCurrentState();

                    requestAnimationFrame(
                        function () {

                            showSelectionControls(
                                uploadedImage,
                                "image"
                            );
                        }
                    );
                }
            );
        }
    );
    renderLayersPanel();
}

function loadSelectedImageIntoLegacyState() {

    const state =
        getCurrentState();

    if (
        !Array.isArray(state.images) ||
        state.images.length === 0
    ) {
        return null;
    }


    let imageState =
        getSelectedImageState();


    /*
        Se ci sono immagini ma nessuna
        è selezionata, selezioniamo
        automaticamente l'ultima.
    */
    if (!imageState) {

        imageState =
            state.images[
                state.images.length - 1
            ];

        state.selectedImageId =
            imageState.id;
    }


    state.imageSrc =
        imageState.src;

    state.x =
        imageState.x;

    state.y =
        imageState.y;

    state.scale =
        imageState.scale;

    state.rotation =
        imageState.rotation;

    state.imageFlipped =
        imageState.flipped;

    state.imageLayer =
        imageState.layer;


    return imageState;
}


function syncSelectedImageFromLegacyState() {

    const state =
        getCurrentState();

    const imageState =
        getSelectedImageState();


    if (!imageState) {
        return;
    }


    imageState.src =
        state.imageSrc;

    imageState.x =
        state.x;

    imageState.y =
        state.y;

    imageState.scale =
        state.scale;

    imageState.rotation =
        state.rotation;

    imageState.flipped =
        state.imageFlipped;

    imageState.layer =
        state.imageLayer;
}

function normalizeElementLayers() {

    const state =
        getCurrentState();


    const elements = [];


    state.images.forEach(
        function (imageState) {

            elements.push({
                type: "image",
                state: imageState,
                layer: imageState.layer
            });
        }
    );


    state.texts.forEach(
        function (textState) {

            elements.push({
                type: "text",
                state: textState,
                layer: textState.layer
            });
        }
    );


    elements.sort(
        function (a, b) {

            return (
                a.layer -
                b.layer
            );
        }
    );


    elements.forEach(
        function (element, index) {

            element.state.layer =
                index + 1;
        }
    );


    const selectedImage =
        getSelectedImageState();


    if (selectedImage) {

        state.imageLayer =
            selectedImage.layer;
    }


    const selectedText =
        getSelectedTextState();


    if (selectedText) {

        state.textLayer =
            selectedText.layer;
    }
}


function refreshMultipleLayers() {

    const state =
        getCurrentState();

    const selectedImage =
        getSelectedImageState();


    if (selectedImage) {

        state.imageLayer =
            selectedImage.layer;
    }


    uploadedImage.style.zIndex =
        state.imageLayer;

    customText.style.zIndex =
        state.textLayer;


    renderMultiImages();
}

function selectImageLayer(imageId) {

    /*
        Salviamo prima eventuali
        modifiche alla foto attuale.
    */
    syncSelectedImageFromLegacyState();


    setSelectedImage(
        imageId
    );


    loadSelectedImageIntoLegacyState();


    selectedElementType =
        "image";


    renderCurrentState();


    requestAnimationFrame(
        function () {

            showSelectionControls(
                uploadedImage,
                "image"
            );
        }
    );
}


function selectTextLayer(textId) {

    /*
        Salviamo prima eventuali modifiche
        della scritta attualmente selezionata.
    */
    syncSelectedTextFromLegacyState();


    setSelectedText(
        textId
    );


    const textState =
        loadSelectedTextIntoLegacyState();


    if (!textState) {
        return;
    }

    /*
    Da questo momento la scritta selezionata
    viene considerata una scritta esistente.

    La prossima modifica del contenuto
    dovrà quindi creare un nuovo punto
    nella cronologia.
*/
newlyCreatedTextId = null;
isEditingText = false;


    selectedElementType =
        "text";


    renderCurrentState();


    requestAnimationFrame(
        function () {

            if (
                textState.visible !== false
            ) {

                showSelectionControls(
                    customText,
                    "text"
                );

            } else {

                selectionControls.style.display =
                    "none";
            }
        }
    );
}

function renderLayersPanel() {

    const state =
        getCurrentState();


    const elements = [];


    /*
        FOTO
    */
    state.images.forEach(
        function (
            imageState,
            index
        ) {

            elements.push({
                type:
                    "image",

                id:
                    imageState.id,

                itemState:
                    imageState,

                index:
                    index,

                layer:
                    imageState.layer
            });
        }
    );


    /*
        TESTI
    */
    state.texts.forEach(
        function (
            textState,
            index
        ) {

            if (!textState.text.trim()) {
                return;
            }


            elements.push({
                type:
                    "text",

                id:
                    textState.id,

                itemState:
                    textState,

                index:
                    index,

                layer:
                    textState.layer
            });
        }
    );


    /*
        Elemento più davanti
        mostrato più in alto.
    */
    elements.sort(
        function (a, b) {

            return (
                b.layer -
                a.layer
            );
        }
    );


    layersList.innerHTML =
        "";


    layersSection.style.display =
        elements.length > 0
            ? "block"
            : "none";


    elements.forEach(
        function (item) {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "layer-item";


            const isImage =
                item.type ===
                "image";


            const isText =
                item.type ===
                "text";

            if (isText) {
                row.dataset.textId = item.id;
            }


            const isActive =
                (
                    isImage &&
                    selectedElementType ===
                        "image" &&
                    state.selectedImageId ===
                        item.id
                ) ||
                (
                    isText &&
                    selectedElementType ===
                        "text" &&
                    state.selectedTextId ===
                        item.id
                );


            const isHidden =
                item.itemState.visible ===
                false;


            if (isActive) {

                row.classList.add(
                    "active"
                );
            }


            if (isHidden) {

                row.classList.add(
                    "hidden-layer"
                );
            }


            /*
                MINIATURA
            */
            const thumbnail =
                document.createElement(
                    "span"
                );


            thumbnail.className =
                "layer-thumb";


            if (isImage) {

                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    item.itemState.src;

                image.alt = "";


                thumbnail.appendChild(
                    image
                );

            } else {

                thumbnail.textContent =
                    "T";
            }


            /*
                NOME
            */
            const name =
                document.createElement(
                    "span"
                );


            name.className =
                "layer-name";


            name.textContent =
                isImage
                    ? `Foto ${item.index + 1}`
                    : `Testo ${item.index + 1}`;


            /*
                NUMERO LIVELLO
            */
            const layerNumber =
                document.createElement(
                    "span"
                );


            layerNumber.className =
                "layer-number";


            layerNumber.textContent =
                item.layer;


            /*
                PULSANTI
            */
            const actions =
                document.createElement(
                    "span"
                );


            actions.className =
                "layer-actions";


            const forwardButton =
                document.createElement(
                    "button"
                );


            forwardButton.type =
                "button";

            forwardButton.className =
                "layer-action-button";

            forwardButton.textContent =
                "↑";

            forwardButton.title =
                "Porta davanti";


            const backwardButton =
                document.createElement(
                    "button"
                );


            backwardButton.type =
                "button";

            backwardButton.className =
                "layer-action-button";

            backwardButton.textContent =
                "↓";

            backwardButton.title =
                "Porta dietro";


            const visibilityButton =
                document.createElement(
                    "button"
                );


            visibilityButton.type =
                "button";

            visibilityButton.className =
                "layer-action-button";

            visibilityButton.textContent =
                isHidden
                    ? "🙈"
                    : "👁";

            visibilityButton.title =
                isHidden
                    ? "Mostra elemento"
                    : "Nascondi elemento";


            const deleteLayerButton =
                document.createElement(
                    "button"
                );


            deleteLayerButton.type =
                "button";

            deleteLayerButton.className =
                "layer-action-button layer-delete-button";

            deleteLayerButton.textContent =
                "🗑";

            deleteLayerButton.title =
                "Elimina elemento";


            const duplicateButton =
                document.createElement(
                    "button"
                );


            duplicateButton.type =
                "button";

            duplicateButton.className =
                "layer-action-button layer-duplicate-button";

            duplicateButton.textContent =
                "⧉";

            duplicateButton.title =
                isImage
                    ? "Duplica foto"
                    : "Duplica testo";


            actions.appendChild(
                forwardButton
            );

            actions.appendChild(
                backwardButton
            );

            actions.appendChild(
                visibilityButton
            );

            actions.appendChild(
                deleteLayerButton
            );

            actions.appendChild(
                duplicateButton
            );


            row.appendChild(
                thumbnail
            );

            row.appendChild(
                name
            );

            row.appendChild(
                layerNumber
            );

            row.appendChild(
                actions
            );


            /*
                SELEZIONE
            */
            row.addEventListener(
                "click",
                function () {

                    if (isHidden) {
                        return;
                    }


                    if (isImage) {

                        selectImageLayer(
                            item.id
                        );

                    } else {

                        selectTextLayer(
                            item.id
                        );
                    }
                }
            );


            /*
                DAVANTI
            */
            forwardButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    if (isHidden) {
                        return;
                    }


                    if (isImage) {

                        selectImageLayer(
                            item.id
                        );

                    } else {

                        selectTextLayer(
                            item.id
                        );
                    }


                    bringForwardButton.click();
                }
            );


            /*
                DIETRO
            */
            backwardButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    if (isHidden) {
                        return;
                    }


                    if (isImage) {

                        selectImageLayer(
                            item.id
                        );

                    } else {

                        selectTextLayer(
                            item.id
                        );
                    }


                    sendBackwardButton.click();
                }
            );


            /*
                MOSTRA / NASCONDI
            */
            visibilityButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        /*
            Salviamo lo stato prima
            di mostrare/nascondere
            l'elemento.
        */
        saveHistoryState();


        item.itemState.visible =
            item.itemState.visible ===
            false;


                    if (
                        item.itemState.visible ===
                            false &&
                        isActive
                    ) {

                        selectedElementType =
                            null;


                        selectionControls.style.display =
                            "none";


                        uploadedImage.classList.remove(
                            "selected-element"
                        );


                        customText.classList.remove(
                            "selected-element"
                        );
                    }


                    if (isText) {

                        /*
                            Se è il testo selezionato
                            sincronizziamo anche
                            il vecchio stato.
                        */
                        if (
                            state.selectedTextId ===
                                item.id
                        ) {

                            state.textVisible =
                                item.itemState.visible;
                        }
                    }


                    renderCurrentState();
                }
            );


            /*
                ELIMINA
            */
            deleteLayerButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    if (isImage) {

                        syncSelectedImageFromLegacyState();

                        setSelectedImage(
                            item.id
                        );

                        loadSelectedImageIntoLegacyState();

                        selectedElementType =
                            "image";

                    } else {

                        syncSelectedTextFromLegacyState();

                        setSelectedText(
                            item.id
                        );

                        loadSelectedTextIntoLegacyState();

                        selectedElementType =
                            "text";
                    }


                    directDeleteButton.click();
                }
            );


            /*
                DUPLICA
            */
            duplicateButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    /*
                        FOTO
                    */
                    if (isImage) {

                        syncSelectedImageFromLegacyState();


                        const originalImage =
                            state.images.find(
                                function (
                                    imageState
                                ) {

                                    return (
                                        imageState.id ===
                                        item.id
                                    );
                                }
                            );


                        if (!originalImage) {
                            return;
                        }

                        /*
    Salviamo lo stato prima
    di duplicare la foto.
*/
saveHistoryState();


                        const duplicatedImage = {

                            ...originalImage,

                            id:
                                "img-" +
                                Date.now() +
                                "-" +
                                Math.random()
                                    .toString(36)
                                    .slice(2, 9),

                            x:
                                originalImage.x +
                                12,

                            y:
                                originalImage.y +
                                12,

                            layer:
                                getHighestContentLayer() +
                                1,

                            visible:
                                true
                        };


                        state.images.push(
                            duplicatedImage
                        );


                        state.selectedImageId =
                            duplicatedImage.id;


                        normalizeElementLayers();

                        loadSelectedImageIntoLegacyState();


                        selectedElementType =
                            "image";


                        renderCurrentState();


                        requestAnimationFrame(
                            function () {

                                showSelectionControls(
                                    uploadedImage,
                                    "image"
                                );
                            }
                        );


                        statusMessage.textContent =
                            "Foto duplicata.";


                        return;
                    }


                    /*
                        TESTO
                    */
                    syncSelectedTextFromLegacyState();


                    const originalText =
                        state.texts.find(
                            function (
                                textState
                            ) {

                                return (
                                    textState.id ===
                                    item.id
                                );
                            }
                        );


                    if (!originalText) {
                        return;
                    }

                    /*
    Salviamo lo stato prima
    di duplicare il testo.
*/
saveHistoryState();


                    const duplicatedText = {

                        ...originalText,

                        id:
                            "text-" +
                            Date.now() +
                            "-" +
                            Math.random()
                                .toString(36)
                                .slice(2, 9),

                        x:
                            originalText.x +
                            12,

                        y:
                            originalText.y +
                            12,

                        layer:
                            getHighestContentLayer() +
                            1,

                        visible:
                            true
                    };


                    state.texts.push(
                        duplicatedText
                    );


                    state.selectedTextId =
                        duplicatedText.id;


                    normalizeElementLayers();

                    loadSelectedTextIntoLegacyState();


                    selectedElementType =
                        "text";


                    renderCurrentState();


                    requestAnimationFrame(
                        function () {

                            showSelectionControls(
                                customText,
                                "text"
                            );
                        }
                    );


                    statusMessage.textContent =
                        "Testo duplicato.";
                }
            );


            layersList.appendChild(
                row
            );
        }
    );
}


function getCurrentState() {

    if (currentProduct === "tshirt") {

        return productStates
            .tshirt[tshirtColor][tshirtSide];
    }

    return productStates
        [currentProduct]
        [getCurrentSide()];
}


function getCurrentPrintAreaCm() {

    return getPrintAreaCm(
        currentProduct,
        currentProduct === "tshirt"
            ? tshirtPrintFormat[tshirtSide]
            : null,
        {
            fit: tshirtFit,
            fabric: tshirtFabric,
            orientation: getProductOrientation(currentProduct)
        }
    );
}


/*
    Misure reali di stampa di un prodotto: servono all'editor e ai
    file di stampa degli articoli nel carrello.
    - format: solo T-shirt ("vertical" o "horizontal")
    - options.fit: modello T-shirt (adulto / bambino)
    - options.orientation: prodotti orientabili (tele, mattonelle)
*/
function getPrintAreaCm(product, format, options) {

    const settings =
        options || {};

    const definition =
        products[product];

    /* Nuovi prodotti: misure prese dalla definizione */
    if (
        definition &&
        definition.printCm
    ) {
        return orientSize(
            definition.printCm,
            definition,
            settings.orientation || null
        );
    }

    if (product === "cushion") {

        return {
            width: 30,
            height: 30
        };
    }


    if (product === "keychain") {

        return {
            width: 4.5,
            height: 4.5
        };
    }


    if (product === "tshirt") {

        /* Dipende da tessuto e modello (vedi TSHIRT_PRINT_CM) */
        return getTshirtPrintCm(format, settings.fit, settings.fabric);
    }


    return null;
}

const HEART_LOGO_SIZE_CM = 8;
const HEART_LOGO_X_CM = 5.5;
const HEART_LOGO_Y_CM = -8;


function getImageScaleForMaxSideCm(targetCm) {

    const printSize =
        getCurrentPrintAreaCm();

    if (
        !printSize ||
        !uploadedImage.offsetWidth ||
        !uploadedImage.offsetHeight
    ) {
        return null;
    }


    const pixelsPerCmX =
        printArea.clientWidth /
        printSize.width;

    const pixelsPerCmY =
        printArea.clientHeight /
        printSize.height;


    const baseWidthCm =
        uploadedImage.offsetWidth /
        pixelsPerCmX;

    const baseHeightCm =
        uploadedImage.offsetHeight /
        pixelsPerCmY;


    const largestBaseSide =
        Math.max(
            baseWidthCm,
            baseHeightCm
        );


    if (!largestBaseSide) {
        return null;
    }


    return (
        targetCm /
        largestBaseSide
    );
}


function applyHeartLogoPreset() {

    const state =
        getCurrentState();

    const printSize =
        getCurrentPrintAreaCm();


    if (
        !state.imageSrc ||
        !printSize
    ) {
        return;
    }


    /*
        Il preset parte sempre
        con il logo diritto.
    */
    state.rotation = 0;

    rotationRange.value = 0;
    rotationValue.textContent = "0°";


    const targetScale =
        getImageScaleForMaxSideCm(
            HEART_LOGO_SIZE_CM
        );


    if (targetScale === null) {
        return;
    }


    const minScale =
        getMinimumImageScale();

    const maxScale =
        getMaximumImageScale();


    state.scale =
        Math.max(
            minScale,
            Math.min(
                maxScale,
                targetScale
            )
        );


    /*
        Conversione centimetri -> pixel
        dell'area di stampa.
    */
    const pixelsPerCmX =
        printArea.clientWidth /
        printSize.width;

    const pixelsPerCmY =
        printArea.clientHeight /
        printSize.height;


    /*
        Lato cuore:
        destra per chi guarda il mockup,
        sinistra per chi indossa la T-shirt.
    */
    let heartXcm;
let heartYcm;


if (
    tshirtPrintFormat[tshirtSide] ===
    "vertical"
) {

    heartXcm = 6.5;
    heartYcm = -12;

} else {

    heartXcm = 8;
    heartYcm = -5;
}


state.x =
    heartXcm *
    pixelsPerCmX;

state.y =
    heartYcm *
    pixelsPerCmY;


    zoomRange.value =
        state.scale;


    updateImageTransform();

    keepImageInsidePrintArea();

    showSelectionControls(
        uploadedImage,
        "image"
    );

    updateImageSizeInfo();


    statusMessage.textContent =
        "Logo posizionato lato cuore.";
}


function updateImageSizeInfo() {

    const state = getCurrentState();

    if (
        !state.imageSrc ||
        !uploadedImage.naturalWidth ||
        !uploadedImage.naturalHeight
    ) {

        imageSizeValue.textContent = "—";
        updateImageCropNote(false);
        return;
    }


    const printSize =
        getCurrentPrintAreaCm();

    if (!printSize) {

        imageSizeValue.textContent = "—";
        return;
    }


    const areaWidthPx =
        printArea.clientWidth;

    const areaHeightPx =
        printArea.clientHeight;


    if (
        areaWidthPx === 0 ||
        areaHeightPx === 0
    ) {
        return;
    }


    const pixelsPerCmX =
        areaWidthPx / printSize.width;

    const pixelsPerCmY =
        areaHeightPx / printSize.height;


    const imageWidthPx =
        uploadedImage.offsetWidth *
        state.scale;

    const imageHeightPx =
        uploadedImage.offsetHeight *
        state.scale;


    /*
        Mostriamo solo la parte della foto che cade
        dentro l'area di stampa: è quella che verrà
        stampata davvero.
    */
    const visible =
        getVisibleImageSizeCm(
            state,
            imageWidthPx,
            imageHeightPx,
            pixelsPerCmX,
            pixelsPerCmY
        );

    imageSizeValue.textContent =
        `${visible.width.toFixed(1)} × ` +
        `${visible.height.toFixed(1)} cm`;

    updateImageCropNote(visible.cropped);
}


/*
   Parte visibile (stampata) di una foto dentro l'area di stampa.
   La foto è centrata nell'area e spostata di state.x / state.y;
   se è ruotata si usa il rettangolo che la contiene.
*/
function getVisibleImageSizeCm(
    state,
    imageWidthPx,
    imageHeightPx,
    pixelsPerCmX,
    pixelsPerCmY
) {

    const areaWidth = printArea.clientWidth;
    const areaHeight = printArea.clientHeight;

    const angle =
        ((Number(state.rotation) || 0) * Math.PI) / 180;

    const boxWidth =
        Math.abs(imageWidthPx * Math.cos(angle)) +
        Math.abs(imageHeightPx * Math.sin(angle));

    const boxHeight =
        Math.abs(imageWidthPx * Math.sin(angle)) +
        Math.abs(imageHeightPx * Math.cos(angle));

    const centerX = areaWidth / 2 + (Number(state.x) || 0);
    const centerY = areaHeight / 2 + (Number(state.y) || 0);

    const visibleWidthPx = Math.max(
        0,
        Math.min(areaWidth, centerX + boxWidth / 2) -
        Math.max(0, centerX - boxWidth / 2)
    );

    const visibleHeightPx = Math.max(
        0,
        Math.min(areaHeight, centerY + boxHeight / 2) -
        Math.max(0, centerY - boxHeight / 2)
    );

    /* Senza rotazione il risultato è esatto; con rotazione è un'approssimazione */
    const isRotated = Math.abs(Math.sin(angle)) > 0.001;

    const fullWidthCm = imageWidthPx / pixelsPerCmX;
    const fullHeightCm = imageHeightPx / pixelsPerCmY;

    const visibleWidthCm = isRotated
        ? Math.min(fullWidthCm, visibleWidthPx / pixelsPerCmX)
        : visibleWidthPx / pixelsPerCmX;

    const visibleHeightCm = isRotated
        ? Math.min(fullHeightCm, visibleHeightPx / pixelsPerCmY)
        : visibleHeightPx / pixelsPerCmY;

    return {
        width: visibleWidthCm,
        height: visibleHeightCm,
        cropped:
            visibleWidthPx + 1 < boxWidth ||
            visibleHeightPx + 1 < boxHeight
    };
}


/* Nota sotto "Dimensione stampa" quando la foto esce dall'area */
function updateImageCropNote(isCropped) {

    let note = document.getElementById("imageCropNote");

    if (!note && imageSizeValue.parentElement) {
        note = document.createElement("small");
        note.id = "imageCropNote";
        note.className = "image-crop-note";
        note.textContent =
            "La foto esce dall'area: la parte esterna non verrà stampata.";
        imageSizeValue.parentElement.appendChild(note);
    }

    if (note) {
        note.hidden = !isCropped;
    }
}

function getTextSizeCm() {

    const state =
        getCurrentState();

    const printSize =
        getCurrentPrintAreaCm();


    if (
        !state.text.trim() ||
        !printSize ||
        !customText.offsetWidth ||
        !customText.offsetHeight
    ) {
        return null;
    }


    const pixelsPerCmX =
        printArea.clientWidth /
        printSize.width;

    const pixelsPerCmY =
        printArea.clientHeight /
        printSize.height;


    const widthCm =
        customText.offsetWidth /
        pixelsPerCmX;

    const heightCm =
        customText.offsetHeight /
        pixelsPerCmY;


    return {
        width: widthCm,
        height: heightCm
    };
}


function updateTextSizeInfo() {

    const size =
        getTextSizeCm();


    if (!size) {

        textSizeValue.textContent = "—";
        return;
    }


    textSizeValue.textContent =
        `${size.width.toFixed(1)} × ` +
        `${size.height.toFixed(1)} cm`;
}

function updateSelectionSizeLabels() {

    let widthCm;
    let heightCm;


    if (
        selectedElementType === "image"
    ) {

        const state =
            getCurrentState();

        const printSize =
            getCurrentPrintAreaCm();


        if (
            !state.imageSrc ||
            !printSize ||
            !uploadedImage.offsetWidth ||
            !uploadedImage.offsetHeight
        ) {

            selectionWidthCm.style.display =
                "none";

            selectionHeightCm.style.display =
                "none";

            return;
        }


        const pixelsPerCmX =
            printArea.clientWidth /
            printSize.width;

        const pixelsPerCmY =
            printArea.clientHeight /
            printSize.height;


        const visible =
            getVisibleImageSizeCm(
                state,
                uploadedImage.offsetWidth * state.scale,
                uploadedImage.offsetHeight * state.scale,
                pixelsPerCmX,
                pixelsPerCmY
            );

        widthCm = visible.width;
        heightCm = visible.height;

    } else if (
        selectedElementType === "text"
    ) {

        const size =
            getTextSizeCm();


        if (!size) {

            selectionWidthCm.style.display =
                "none";

            selectionHeightCm.style.display =
                "none";

            return;
        }


        widthCm = size.width;
        heightCm = size.height;

    } else {

        selectionWidthCm.style.display =
            "none";

        selectionHeightCm.style.display =
            "none";

        return;
    }


    selectionWidthCm.textContent =
        `${widthCm.toFixed(1)} cm`;

    selectionHeightCm.textContent =
        `${heightCm.toFixed(1)} cm`;


    selectionWidthCm.style.display =
        "block";

    selectionHeightCm.style.display =
        "block";
}

const MIN_IMAGE_SIZE_CM = 6.4;
const MIN_KEYCHAIN_IMAGE_SIZE_CM = 1;


function getMinimumImageScale() {

    const printSize =
        getCurrentPrintAreaCm();

    if (
        !printSize ||
        !uploadedImage.offsetWidth ||
        !uploadedImage.offsetHeight
    ) {
        return 0.1;
    }


    const areaWidthPx =
        printArea.clientWidth;

    const areaHeightPx =
        printArea.clientHeight;


    const pixelsPerCmX =
        areaWidthPx / printSize.width;

    const pixelsPerCmY =
        areaHeightPx / printSize.height;


    const baseWidthCm =
        uploadedImage.offsetWidth /
        pixelsPerCmX;

    const baseHeightCm =
        uploadedImage.offsetHeight /
        pixelsPerCmY;


    const largestBaseSide =
        Math.max(
            baseWidthCm,
            baseHeightCm
        );


    const minimumSizeCm =
    (currentProduct === "keychain" ||
        String(currentProduct).startsWith("keychain-"))
        ? MIN_KEYCHAIN_IMAGE_SIZE_CM
        : MIN_IMAGE_SIZE_CM;


return (
    minimumSizeCm /
    largestBaseSide
);
}

function getMaximumImageScale() {

    if (
        !uploadedImage.offsetWidth ||
        !uploadedImage.offsetHeight ||
        !printArea.clientHeight
    ) {
        return 3;
    }


    const state =
        getCurrentState();


    const baseWidth =
        uploadedImage.offsetWidth;

    const baseHeight =
        uploadedImage.offsetHeight;


    const angle =
        (state.rotation || 0) *
        Math.PI / 180;


    /*
        Altezza occupata dall'immagine
        dopo la rotazione, con scala 1.
    */
    const rotatedHeight =
        Math.abs(
            baseHeight *
            Math.cos(angle)
        ) +
        Math.abs(
            baseWidth *
            Math.sin(angle)
        );


    if (!rotatedHeight) {
        return 3;
    }


    return (
        printArea.clientHeight /
        rotatedHeight
    );
}


function updateMinimumImageScale() {

    const state =
        getCurrentState();

    if (!state.imageSrc) {
        return;
    }


    const minScale =
        getMinimumImageScale();


    zoomRange.min = minScale;


    if (state.scale < minScale) {

        state.scale = minScale;

        zoomRange.value =
            minScale;

        updateImageTransform();
    }
}

function updateMaximumImageScale() {

    const state =
        getCurrentState();

    if (!state.imageSrc) {
        return;
    }


    const maxScale =
        getMaximumImageScale();


    zoomRange.max =
        maxScale;


    if (state.scale > maxScale) {

        state.scale =
            maxScale;

        zoomRange.value =
            maxScale;

        updateImageTransform();
    }
}

uploadedImage.addEventListener(
    "load",
    function () {

        updateMinimumImageScale();
        updateMaximumImageScale();
        updateImageSizeInfo();

    }
);

function updateImageTransform() {

    const state = getCurrentState();

    syncSelectedImageFromLegacyState();

    const scaleX =
        state.imageFlipped
            ? -state.scale
            : state.scale;

    uploadedImage.style.transform =
        `translate(${state.x}px, ${state.y}px)
         scale(${scaleX}, ${state.scale})
         rotate(${state.rotation}deg)`;
         updateImageSizeInfo();
         updateSelectionSizeLabels();
}

function flipImage() {

    const state = getCurrentState();

    state.imageFlipped =
        !state.imageFlipped;

    updateImageTransform();

    if (selectedElementType === "image") {
        showSelectionControls(
            uploadedImage,
            "image"
        );
    }
}

function flipText() {

    const state = getCurrentState();

    state.textFlipped = !state.textFlipped;

    const textScaleX =
        state.textFlipped ? -1 : 1;

    customText.style.transform =
        `translate(
            calc(-50% + ${state.textX}px),
            calc(-50% + ${state.textY}px)
        )
        rotate(${state.textRotation}deg)
        scaleX(${textScaleX})`;

    if (selectedElementType === "text") {
        showSelectionControls(
            customText,
            "text"
        );
    }
}

function updateTextTransform() {

    const state = getCurrentState();

    const textScaleX =
        state.textFlipped ? -1 : 1;

    customText.style.transform =
        `translate(
            calc(-50% + ${state.textX}px),
            calc(-50% + ${state.textY}px)
        )
        rotate(${state.textRotation}deg)
        scaleX(${textScaleX})`;

    updateTextSizeInfo();
    updateSelectionSizeLabels();

    syncSelectedTextFromLegacyState();
renderMultiTexts();
}

function keepImageInsidePrintArea() {

    const state = getCurrentState();

    updateImageTransform();

    const areaRect =
        printArea.getBoundingClientRect();

    const imageRect =
        uploadedImage.getBoundingClientRect();

    const previewScale =
        previewZoom / 100;

    let correctionX = 0;
    let correctionY = 0;


    if (imageRect.width <= areaRect.width) {

        if (imageRect.left < areaRect.left) {

            correctionX +=
                (areaRect.left - imageRect.left) /
                previewScale;
        }

        if (imageRect.right > areaRect.right) {

            correctionX -=
                (imageRect.right - areaRect.right) /
                previewScale;
        }

    } else {

    /*
        Se l'immagine è più larga
        dell'area, permettiamo
        lo spostamento orizzontale.

        Impediamo soltanto che
        compaiano zone vuote.
    */

    if (
        imageRect.left >
        areaRect.left
    ) {

        correctionX -=
            (
                imageRect.left -
                areaRect.left
            ) / previewScale;
    }


    if (
        imageRect.right <
        areaRect.right
    ) {

        correctionX +=
            (
                areaRect.right -
                imageRect.right
            ) / previewScale;
    }
}


    if (imageRect.height <= areaRect.height) {

        if (imageRect.top < areaRect.top) {

            correctionY +=
                (areaRect.top - imageRect.top) /
                previewScale;
        }

        if (imageRect.bottom > areaRect.bottom) {

            correctionY -=
                (imageRect.bottom - areaRect.bottom) /
                previewScale;
        }

    } else {

        correctionY +=
            (
                (areaRect.top + areaRect.bottom) / 2 -
                (imageRect.top + imageRect.bottom) / 2
            ) / previewScale;
    }


    state.x += correctionX;
    state.y += correctionY;

    updateImageTransform();
}

function fitImageInsidePrintArea() {

    const state =
        getCurrentState();

    if (!state.imageSrc) {
        return;
    }


    const maxScale =
        getMaximumImageScale();


    /*
        Il limite massimo dipende
        esclusivamente dall'altezza.

        La larghezza può invece
        superare liberamente
        l'area di stampa.
    */
    if (state.scale > maxScale) {

        state.scale =
            maxScale;

        zoomRange.value =
            maxScale;

        updateImageTransform();
    }
}


function updateMobileCustomizingState() {

    const state = getCurrentState();

    const hasImages =
        Array.isArray(state.images) &&
        state.images.length > 0;

    const hasTexts =
        Array.isArray(state.texts) &&
        state.texts.some(function (textState) {
            return (
                textState.text &&
                textState.text.trim() !== ""
            );
        });

    const hasDesign =
        hasImages || hasTexts;

    document.body.classList.toggle(
        "mobile-customizing",
        hasDesign
    );
}

function renderCurrentState() {

    /* Porta posizioni e testi alla scala dell'area stampabile attuale. */
    rebaseVisibleStatesToLayout();

    const state = getCurrentState();

    loadSelectedImageIntoLegacyState();
    loadSelectedTextIntoLegacyState();

    printArea.style.backgroundColor =
    state.printBgEnabled
        ? state.printBgColor
        : "transparent";

printBgColor.value =
    state.printBgColor || "#ffffff";


    const selectedImageState =
    getSelectedImageState();


const selectedImageVisible =
    !selectedImageState ||
    selectedImageState.visible !== false;


if (
    state.imageSrc &&
    selectedImageVisible
) {

    uploadedImage.src =
        state.imageSrc;

    uploadedImage.style.display =
        "block";

} else {

    uploadedImage.src =
        state.imageSrc || "";

    uploadedImage.style.display =
        "none";
}


    textInput.value = state.text;
customText.textContent = state.text;
customText.style.display =
    state.textVisible === false
        ? "none"
        : "";

customText.style.fontSize =
    `${state.textSize}px`;

    customText.style.fontFamily =
    state.fontFamily;

fontSelect.value =
    state.fontFamily;

    customText.style.color =
    state.textColor;

textColor.value =
    state.textColor;
    
    customText.style.webkitTextStroke =
    state.textOutlineEnabled
        ? `${state.textOutlineWidth}px ${state.textOutlineColor}`
        : "0px transparent";

textOutlineEnabled.checked =
    state.textOutlineEnabled;

textOutlineColor.value =
    state.textOutlineColor;

textOutlineWidth.value =
    state.textOutlineWidth;

textOutlineWidthValue.textContent =
    `${state.textOutlineWidth} px`;

    customText.style.fontWeight =
    state.textBold ? "700" : "400";

customText.style.fontStyle =
    state.textItalic ? "italic" : "normal";

    customText.style.textAlign =
    state.textAlign || "center";

boldButton.classList.toggle(
    "active",
    state.textBold
);

italicButton.classList.toggle(
    "active",
    state.textItalic
);

textAlignLeft.classList.toggle(
    "active",
    state.textAlign === "left"
);

textAlignCenter.classList.toggle(
    "active",
    !state.textAlign ||
    state.textAlign === "center"
);

textAlignRight.classList.toggle(
    "active",
    state.textAlign === "right"
);

textSizeRange.value = state.textSize;
textRotationRange.value = state.textRotation;

const textScaleX =
    state.textFlipped ? -1 : 1;

customText.style.transform =
    `translate(
        calc(-50% + ${state.textX}px),
        calc(-50% + ${state.textY}px)
    )
    rotate(${state.textRotation}deg)
    scaleX(${textScaleX})`;

zoomRange.value = state.scale;
rotationRange.value = state.rotation;

uploadedImage.style.zIndex =
    state.imageLayer;

customText.style.zIndex =
    state.textLayer;

renderMultiImages();
renderMultiTexts();

updateImageTransform();

updateMobileCustomizingState();
updateMobileTextSelectionBar();

scheduleTshirtSideThumbs();
}

function setTextAlignment(alignment) {

    const state =
        getCurrentState();

    state.textAlign =
        alignment;

    customText.style.textAlign =
        alignment;


    textAlignLeft.classList.toggle(
        "active",
        alignment === "left"
    );

    textAlignCenter.classList.toggle(
        "active",
        alignment === "center"
    );

    textAlignRight.classList.toggle(
        "active",
        alignment === "right"
    );


    requestAnimationFrame(
        function () {

            refreshTextLayout();

        }
    );
}
textAlignLeft.addEventListener(
    "click",
    function () {

        saveHistoryState();

        setTextAlignment("left");

    }
);


textAlignCenter.addEventListener(
    "click",
    function () {

        saveHistoryState();

        setTextAlignment("center");

    }
);


textAlignRight.addEventListener(
    "click",
    function () {

        saveHistoryState();

        setTextAlignment("right");

    }
);


function resetCurrentState() {

    /*
        Salviamo tutta la personalizzazione
        prima di eseguire il reset.

        In questo modo Annulla può recuperare
        foto, testi, sfondo e impostazioni
        in un solo passaggio.
    */
    saveHistoryState();

    const side =
        getCurrentSide();

    if (currentProduct === "tshirt") {

    productStates
        .tshirt[tshirtColor][side] =
        createEmptyState();

} else {

    productStates
        [currentProduct][side] =
        createEmptyState();
}


    imageUpload.value = "";

    imagesLayer.innerHTML = "";


    uploadedImage.src = "";

    uploadedImage.style.display =
        "none";

    uploadedImage.classList.remove(
        "selected-element"
    );


    customText.classList.remove(
        "selected-element"
    );


    selectedElementType = null;

    selectionControls.style.display =
        "none";


    guideVertical.style.display =
        "none";

    guideHorizontal.style.display =
        "none";

    rotationGuide.style.display =
        "none";


    imageSizeValue.textContent =
        "—";

    textSizeValue.textContent =
        "—";


    renderCurrentState();
}


function updateProductPreview() {

    const product = products[currentProduct];

    const unitPrice = getCurrentUnitPrice();

    productTitle.textContent =
        currentProduct === "tshirt"
            ? getTshirtVariantLabel(tshirtFabric, tshirtFit)
            : product.title;
    productName.textContent = product.name;
    productPrice.textContent =
    formatProductPrice(unitPrice);

    productPrice.classList.toggle(
        "price-pending",
        typeof unitPrice !== "number"
    );

    productDimensions.textContent = getProductDimensionsText();
    const printTexts = getOrientedPrintTexts(currentProduct);

    printDimensions.textContent = printTexts.print;

    printAreaInfo.textContent = printTexts.printInfo;

    updateTshirtPriceDisplay();

    updateRealPhotoThumb();


    productPreview.className = "product-preview";

    productPreview.style.backgroundImage = "";

    printArea.className = "print-area";
    // Rimuove eventuali impostazioni rimaste dalla T-Shirt
printArea.style.width = "";
printArea.style.height = "";
printArea.style.top = "";
printArea.style.left = "";
printArea.style.transform = "";


    if (currentProduct === "cushion") {

        productPreview.classList.add("cushion-preview");

        tshirtOptions.style.display = "none";
        printFormatOptions.style.display = "none";
    }


    if (currentProduct === "tshirt") {

    productPreview.classList.add("tshirt-preview");

    printArea.classList.add("tshirt-print-area");

    if (tshirtSide === "back") {
        printArea.classList.add("tshirt-back-print-area");
    }

    tshirtOptions.style.display = "block";
    printFormatOptions.style.display = "block";

    syncTshirtOptionButtons();
    updateTshirtPrintFormat();
    updateTshirtMockup();
}


    if (currentProduct === "keychain") {

        productPreview.classList.add("keychain-preview");

        printArea.classList.add("keychain-print-area");

        tshirtOptions.style.display = "none";
        printFormatOptions.style.display = "none";
    }


    /* Portachiavi: cambiando prodotto si riparte dal fronte */
    if (keychainSideProduct !== currentProduct) {
        keychainSideProduct = currentProduct;
        keychainSide = "front";
    }

    /* Nuovi prodotti */
    productPreview.style.width = "";
    productPreview.style.height = "";
    productPreview.style.marginTop = "";
    productPreview.style.removeProperty("--ring-image");
    productPreview.style.removeProperty("--ring-offset");
    printShapeMask.style.display = "none";
    printShapeMask.style.backgroundImage = "";

    if (product.layout) {
        applyGenericProductPreview(product);

        tshirtOptions.style.display = "none";
        printFormatOptions.style.display = "none";
    }

    updateVariantButtons();
    updateOrientationButtons();
    updateKeychainSideButtons();
    updateCushionBackOptions();

    /* Fronte/Retro e formato su mobile seguono il prodotto scelto */
    updateMobileQuickControls();

    renderCurrentState();
}


/* =========================================
   PULSANTI ORIENTAMENTO
   ========================================= */

function updateOrientationButtons() {

    const orientation =
        getProductOrientation(currentProduct);

    document.body.classList.toggle(
        "product-orientable",
        Boolean(orientation)
    );

    if (orientationOptions) {
        orientationOptions.style.display =
            orientation ? "block" : "none";
    }

    document
        .querySelectorAll("[data-orientation]")
        .forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.orientation === orientation
            );
        });

    if (mobileOrientationToggle && orientation) {
        mobileOrientationToggle.querySelector(
            ".mobile-orientation-label"
        ).textContent =
            orientation === "vertical"
                ? "Verticale"
                : "Orizzontale";
    }
}

/* =========================================
   CUSCINI QUADRATI: COLORE DEL RETRO
   ========================================= */

const mobileCushionBackToggle =
    document.getElementById("mobileCushionBackToggle");

const mobileCushionBackMenu =
    document.getElementById("mobileCushionBackMenu");

function closeMobileCushionBackMenu() {

    if (!mobileCushionBackMenu || mobileCushionBackMenu.hidden) {
        return;
    }

    mobileCushionBackMenu.hidden = true;
    mobileCushionBackToggle.setAttribute("aria-expanded", "false");
}

function updateCushionBackOptions() {

    const visible =
        hasCushionBack(currentProduct);

    const options =
        document.getElementById("cushionBackOptions");

    if (options) {
        options.style.display = visible ? "block" : "none";
    }

    /* Su smartphone mostra il pulsante "Retro" */
    document.body.classList.toggle("product-cushion-back", visible);

    if (!visible) {
        closeMobileCushionBackMenu();
    }

    const back =
        CUSHION_BACK_COLORS[normalizeCushionBackColor(cushionBackColor)];

    document
        .querySelectorAll("[data-cushion-back]")
        .forEach(function (button) {

            const active =
                button.dataset.cushionBack === cushionBackColor;

            button.classList.toggle("active", active);
            button.setAttribute("aria-checked", active ? "true" : "false");
        });

    document
        .querySelectorAll("[data-cushion-back-name]")
        .forEach(function (element) {
            element.textContent = back.label;
        });

    document
        .querySelectorAll("[data-cushion-back-dot]")
        .forEach(function (element) {
            element.style.backgroundColor = back.hex;
        });
}

function setCushionBackColor(color) {

    color = normalizeCushionBackColor(color);

    if (color !== cushionBackColor) {

        cushionBackColor = color;

        saveConfiguratorState();

        statusMessage.textContent =
            "Retro del cuscino: " + CUSHION_BACK_COLORS[color].label + ".";
    }

    /* La foto "Retro" accanto all'anteprima segue il colore */
    updateRealPhotoThumb();
    updateCushionBackOptions();
}

/* Un pallino per colore, nel pannello e nel menu su smartphone */
document
    .querySelectorAll("[data-cushion-back-swatches]")
    .forEach(function (container) {

        Object.keys(CUSHION_BACK_COLORS).forEach(function (key) {

            const color = CUSHION_BACK_COLORS[key];
            const button = document.createElement("button");

            button.type = "button";
            button.className = "cushion-back-swatch";
            button.dataset.cushionBack = key;
            button.title = color.label;
            button.setAttribute("role", "radio");
            button.setAttribute("aria-label", color.label);
            button.style.setProperty("--swatch", color.hex);

            button.addEventListener("click", function () {
                setCushionBackColor(key);
                closeMobileCushionBackMenu();
            });

            container.appendChild(button);
        });
    });

if (mobileCushionBackToggle && mobileCushionBackMenu) {

    mobileCushionBackToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const open = mobileCushionBackMenu.hidden;

        mobileCushionBackMenu.hidden = !open;
        mobileCushionBackToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    /* Tocco fuori dal menu: si chiude */
    document.addEventListener("click", function (event) {
        if (
            !mobileCushionBackMenu.contains(event.target) &&
            event.target !== mobileCushionBackToggle
        ) {
            closeMobileCushionBackMenu();
        }
    });
}

updateCushionBackOptions();


/* =========================================
   PORTACHIAVI: FRONTE / RETRO
   ========================================= */

function updateKeychainSideButtons() {

    const options =
        document.getElementById("keychainSideOptions");

    const doubleSided =
        isDoubleSidedProduct(currentProduct);

    if (options) {
        options.style.display = doubleSided ? "block" : "none";
    }

    document
        .querySelectorAll("[data-keychain-side]")
        .forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.keychainSide === keychainSide
            );
        });
}

function setKeychainSide(side) {

    side = side === "back" ? "back" : "front";

    if (
        !isDoubleSidedProduct(currentProduct) ||
        keychainSide === side
    ) {
        updateKeychainSideButtons();
        return;
    }

    /* Salva le ultime modifiche del lato che si lascia */
    syncSelectedImageFromLegacyState();
    syncSelectedTextFromLegacyState();

    keychainSide = side;

    uploadedImage.classList.remove("selected-element");
    customText.classList.remove("selected-element");
    selectionControls.style.display = "none";
    selectedElementType = null;

    updateProductPreview();

    statusMessage.textContent =
        side === "back"
            ? "Stai personalizzando il retro del portachiavi."
            : "Stai personalizzando il fronte del portachiavi.";
}

document
    .querySelectorAll("[data-keychain-side]")
    .forEach(function (button) {
        button.addEventListener("click", function () {
            setKeychainSide(button.dataset.keychainSide);
        });
    });

function setProductOrientation(orientation) {

    if (
        !getProductOrientation(currentProduct) ||
        getProductOrientation(currentProduct) === orientation
    ) {
        return;
    }

    saveHistoryState();

    productStates[currentProduct].front.orientation =
        orientation;

    selectionControls.style.display = "none";

    updateProductPreview();

    statusMessage.textContent =
        orientation === "vertical"
            ? "Area di stampa in verticale."
            : "Area di stampa in orizzontale.";
}

document
    .querySelectorAll("[data-orientation]")
    .forEach(function (button) {
        button.addEventListener("click", function () {
            setProductOrientation(button.dataset.orientation);
        });
    });

if (mobileOrientationToggle) {
    mobileOrientationToggle.addEventListener("click", function () {
        setProductOrientation(
            getProductOrientation(currentProduct) === "vertical"
                ? "horizontal"
                : "vertical"
        );
    });
}


/* =========================================
   ANTEPRIMA DEI NUOVI PRODOTTI
   -----------------------------------------
   L'area di stampa viene dimensionata in pixel
   mantenendo le proporzioni reali in cm: così le
   misure mostrate restano quelle di stampa.
   ========================================= */

const GENERIC_PREVIEW_PADDING = {
    cushion: 0.12,
    heart: 0.06, // uguale al margine delle immagini assets/products/*-body.png
    canvas: 0,
    tile: 0.025,
    mousepad: 0.02,
    slate: 0.12,  // uguale al margine delle immagini assets/products/slate-*-body.png
    puzzle: 0.05, // uguale al margine delle immagini assets/products/puzzle-*-body.png (cornice)
    magnet: 0.06, // uguale al margine delle immagini assets/products/magnet-*-body.png
    "keychain-mdf": 0.12 // uguale al margine delle immagini keychain-*-body.png
};

/*
    Versione delle immagini delle sagome (assets/products): va cambiata
    quando si rifanno, così i browser non usano quelle vecchie in cache.
*/
const SHAPE_ASSETS_VERSION = "2";

/* Margine dell'immagine dell'anello (keychain-*-ring.png) rispetto all'area di stampa */
const KEYCHAIN_RING_PAD = 0.75;

/*
    Indirizzo completo di un file in assets/. Su WordPress la pagina usa
    <base> verso la cartella del plugin, ma html2canvas (anteprime del
    carrello) risolve i percorsi relativi rispetto all'indirizzo della
    pagina: con l'indirizzo completo le sagome si caricano sempre.
*/
function getAssetUrl(path) {
    return new URL(path, document.baseURI).href;
}


function applyGenericProductPreview(product) {

    const isMobile = window.innerWidth <= 600;

    /* I portachiavi sono più piccoli per lasciare spazio all'anello */
    const maxBox =
        product.layout === "keychain-mdf"
            ? (isMobile ? 220 : 320)
            : (isMobile ? 290 : 430);

    const paddingRatio =
        GENERIC_PREVIEW_PADDING[product.layout] || 0;

    const printCm = getOrientedPrintCm(currentProduct);

    const ratio =
        printCm.width / printCm.height;

    const available = maxBox / (1 + paddingRatio * 2);

    let printWidth = available;
    let printHeight = available / ratio;

    if (printHeight > available) {
        printHeight = available;
        printWidth = available * ratio;
    }

    printWidth = Math.round(printWidth);
    printHeight = Math.round(printHeight);

    const padding = Math.round(
        Math.max(printWidth, printHeight) * paddingRatio
    );

    productPreview.classList.add(
        "generic-preview",
        `generic-${product.layout}`
    );

    printArea.classList.add(
        "generic-print-area",
        `generic-print-${product.layout}`
    );

    productPreview.style.width =
        printWidth + padding * 2 + "px";

    productPreview.style.height =
        printHeight + padding * 2 + "px";

    printArea.style.width = printWidth + "px";
    printArea.style.height = printHeight + "px";

    if (product.shape) {

        /* Rettangolo in orizzontale: sagoma ruotata (file "-h") */
        const shapeName =
            product.orientable &&
            getProductOrientation(currentProduct) !==
                getBaseOrientation(product)
                ? product.shape + "-h"
                : product.shape;

        /* Portachiavi, retro: sagoma specchiata (girandolo, il buco
           dell'anello passa dall'altra parte) */
        const shapeFile =
            product.layout === "keychain-mdf" && getCurrentSide() === "back"
                ? shapeName + "-back"
                : shapeName;

        productPreview.style.backgroundImage =
            `url("${getAssetUrl(`assets/products/${shapeFile}-body.png?v=${SHAPE_ASSETS_VERSION}`)}")`;

        printShapeMask.style.backgroundImage =
            `url("${getAssetUrl(`assets/products/${shapeFile}-mask.png?v=${SHAPE_ASSETS_VERSION}`)}")`;

        /* Portachiavi: anello e fascetta in un livello sopra, più grande */
        if (product.layout === "keychain-mdf") {

            const longSide = Math.max(printWidth, printHeight);
            const ringPad = Math.round(longSide * KEYCHAIN_RING_PAD);

            productPreview.style.setProperty(
                "--ring-image",
                `url("${getAssetUrl(`assets/products/${shapeFile}-ring.png?v=${SHAPE_ASSETS_VERSION}`)}")`
            );

            productPreview.style.setProperty(
                "--ring-offset",
                ringPad - padding + "px"
            );

            /* Abbassa un po' il portachiavi così si vede anche l'anello */
            const pxPerCm =
                longSide / Math.max(printCm.width, printCm.height);

            productPreview.style.marginTop =
                Math.round(pxPerCm * 1.6) + "px";
        }

        printShapeMask.style.display = "block";
    }
}


/* Se si passa da computer a smartphone (o viceversa) ricalcola le misure */
let genericPreviewIsMobile = window.innerWidth <= 600;

window.addEventListener("resize", function () {

    const isMobile = window.innerWidth <= 600;

    if (
        isMobile !== genericPreviewIsMobile &&
        products[currentProduct] &&
        products[currentProduct].layout
    ) {
        updateProductPreview();
    }

    genericPreviewIsMobile = isMobile;
});


/* =========================================
   PULSANTI "FORMATO" (varianti dello stesso prodotto)
   ========================================= */

/* Pulsanti delle categorie (Cuscini, T-Shirt, Portachiavi...) */
function updateCategoryButtons() {

    const container =
        document.getElementById("categoryButtons");

    if (!container) {
        return;
    }

    const activeCategory = getProductCategory(currentProduct);

    if (!container.dataset.built) {

        productCategories.forEach(function (category) {

            const productsInCategory =
                getCategoryProducts(category.key);

            if (!productsInCategory.length) {
                return;
            }

            const button = document.createElement("button");

            button.type = "button";
            button.className = "category-button";
            button.dataset.category = category.key;

            const icon = document.createElement("span");
            icon.className = "category-button-icon";
            icon.setAttribute("aria-hidden", "true");
            icon.textContent = category.icon;

            const label = document.createElement("span");
            label.className = "category-button-label";
            label.textContent = category.label;

            button.appendChild(icon);
            button.appendChild(label);

            button.addEventListener("click", function () {
                selectProductCategory(category.key);
            });

            container.appendChild(button);
        });

        container.dataset.built = "1";
    }

    container
        .querySelectorAll(".category-button")
        .forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.category === activeCategory
            );
        });
}

/* Apre una categoria: riprende l'ultimo tipo scelto, altrimenti il primo */
function selectProductCategory(categoryKey) {

    const productsInCategory = getCategoryProducts(categoryKey);

    if (!productsInCategory.length) {
        return;
    }

    if (getProductCategory(currentProduct) === categoryKey) {
        return;
    }

    const remembered = lastProductByCategory[categoryKey];

    const target =
        productsInCategory.indexOf(remembered) !== -1
            ? remembered
            : productsInCategory[0];

    productSelect.value = target;
    productSelect.dispatchEvent(
        new Event("change", { bubbles: true })
    );
}

function updateVariantButtons() {

    if (getProductCategory(currentProduct)) {
        lastProductByCategory[getProductCategory(currentProduct)] =
            currentProduct;
    }

    updateCategoryButtons();

    if (!variantOptions) {
        return;
    }

    const current = productVariants[currentProduct];

    const category = productCategories.find(function (item) {
        return current && item.key === current.group;
    });

    const variantLabel =
        document.getElementById("variantOptionsLabel");

    if (variantLabel) {
        variantLabel.textContent =
            (category && category.variantLabel) || "Tipo";
    }

    const siblings = Object.keys(productVariants).filter(
        function (key) {
            return (
                current &&
                productVariants[key].group === current.group &&
                products[key]
            );
        }
    );

    variantButtons.innerHTML = "";

    /* Con un solo tipo il pulsante si mostra solo se la categoria
       ha un nome per i tipi (es. Calamite → Pergamena) */
    if (
        siblings.length < 2 &&
        !(siblings.length === 1 && category && category.variantLabel)
    ) {
        variantOptions.style.display = "none";
        return;
    }

    siblings.forEach(function (key) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "variant-button";
        button.textContent = productVariants[key].label;
        button.dataset.variant = key;

        if (key === currentProduct) {
            button.classList.add("active");
        }

        button.addEventListener("click", function () {

            if (productSelect.value === key) {
                return;
            }

            productSelect.value = key;
            productSelect.dispatchEvent(
                new Event("change", { bubbles: true })
            );
        });

        variantButtons.appendChild(button);
    });

    variantOptions.style.display = "block";
}


/* =========================================
   T-SHIRT: TESSUTO E MODELLO
   ========================================= */

function setTshirtVariant(fabric, fit, changed) {

    fabric = normalizeTshirtFabric(fabric);
    fit = normalizeTshirtFit(fit);

    /* Il bambino c'è solo in poliestere: se si sceglie "Bambino"
       col cotone passa al poliestere, se si sceglie il cotone
       col bambino passa all'adulto */
    if (!isTshirtFitAvailable(fabric, fit)) {
        if (changed === "fit") {
            fabric = "polyester";
        } else {
            fit = TSHIRT_FABRICS[fabric].fits[0];
        }
    }

    tshirtFabric = fabric;
    tshirtFit = fit;

    /* Cotone: solo formato verticale */
    normalizeTshirtVariantState();

    /* Il poliestere esiste solo bianco */
    if (TSHIRT_FABRICS[fabric].colors.indexOf(tshirtColor) === -1) {

        const whiteButton =
            document.querySelector('.color-button[data-color="white"]');

        if (whiteButton && currentProduct === "tshirt") {
            /* stesso percorso del pulsante "Bianca":
               salva il colore attuale e passa al bianco */
            whiteButton.click();
        } else {
            tshirtColor = "white";
        }
    }

    /* Taglia non disponibile per il modello: usa quella predefinita */
    const sizeInfo = getTshirtSizeInfo(fabric, fit);

    if (sizeInfo.sizes.indexOf(tshirtSize) === -1) {
        tshirtSize = sizeInfo.default;
    }

    syncTshirtOptionButtons();

    if (currentProduct === "tshirt") {
        refreshProductHeader();

        /* Adulto e bambino hanno aree di stampa diverse */
        updateTshirtPrintFormat();

        /* Il poliestere ha la sua sagoma */
        updateTshirtMockup();

        /* Su smartphone il formato orizzontale non c'è per il cotone */
        updateMobileQuickControls();
    }
}

/* Aggiorna titolo e prezzo senza ridisegnare l'anteprima */
function refreshProductHeader() {

    const unitPrice = getCurrentUnitPrice();

    productTitle.textContent =
        currentProduct === "tshirt"
            ? getTshirtVariantLabel(tshirtFabric, tshirtFit)
            : products[currentProduct].title;

    productPrice.textContent = formatProductPrice(unitPrice);

    productPrice.classList.toggle(
        "price-pending",
        typeof unitPrice !== "number"
    );

    productDimensions.textContent = getProductDimensionsText();

    const printTexts = getOrientedPrintTexts(currentProduct);
    printDimensions.textContent = printTexts.print;
    printAreaInfo.textContent = printTexts.printInfo;

    updateTshirtPriceDisplay();
}

/* Testo "Dimensione / Taglie" del riquadro prodotto */
function getProductDimensionsText() {

    if (currentProduct !== "tshirt") {
        return products[currentProduct].dimensions;
    }

    const sizes = getTshirtSizeInfo(tshirtFabric, tshirtFit).sizes;

    if (tshirtFit === "kids") {
        return "Taglie disponibili: " +
            sizes
                .map(function (size) {
                    return size.replace(" anni", "");
                })
                .join(", ") +
            " anni";
    }

    return "Taglie disponibili: " + sizes.join(", ");
}

/* Mette in evidenza i pulsanti giusti (tessuto, modello, colore, taglia) */
function syncTshirtOptionButtons() {

    tshirtFabric = normalizeTshirtFabric(tshirtFabric);
    tshirtFit = normalizeTshirtFit(tshirtFit);

    /* Taglia non valida (es. salvataggio vecchio): usa quella proposta */
    const sizeInfo = getTshirtSizeInfo(tshirtFabric, tshirtFit);

    if (sizeInfo.sizes.indexOf(tshirtSize) === -1) {
        tshirtSize = sizeInfo.default;
    }

    document
        .querySelectorAll("[data-tshirt-fabric]")
        .forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.tshirtFabric === tshirtFabric
            );
        });

    document
        .querySelectorAll("[data-tshirt-fit]")
        .forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.tshirtFit === tshirtFit
            );
        });

    /* Cotone: niente bambino (nota sotto "Modello") */
    const fitNote = document.getElementById("tshirtFitNote");

    if (fitNote) {
        fitNote.style.display =
            isTshirtFitAvailable(tshirtFabric, "kids") ? "none" : "block";
    }

    const onlyWhite =
        TSHIRT_FABRICS[tshirtFabric].colors.length < 2;

    const colorRow = document.getElementById("tshirtColorRow");
    const colorNote = document.getElementById("tshirtColorNote");

    if (colorRow) {
        colorRow.style.display = onlyWhite ? "none" : "";
    }

    if (colorNote) {
        colorNote.style.display = onlyWhite ? "block" : "none";
    }

    document
        .querySelectorAll(".color-button")
        .forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.color === tshirtColor
            );
        });

    document
        .querySelectorAll(".size-buttons[data-size-group]")
        .forEach(function (group) {
            group.style.display =
                group.dataset.sizeGroup ===
                    (tshirtFit === "adult" ? "adult" : tshirtFit + "-" + tshirtFabric)
                    ? "grid"
                    : "none";
        });

    document
        .querySelectorAll(".size-button")
        .forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.size === tshirtSize
            );
        });

    /* Testo dei pulsanti Verticale / Orizzontale con le misure giuste;
       il cotone si stampa solo in verticale */
    const formats = getTshirtFormats();

    document
        .querySelectorAll(".print-format-button[data-format]")
        .forEach(function (button) {
            button.textContent =
                (button.dataset.format === "horizontal"
                    ? "Orizzontale "
                    : "Verticale ") +
                formatTshirtPrintCm(button.dataset.format);

            button.hidden =
                formats.indexOf(button.dataset.format) === -1;

            button.classList.toggle(
                "active",
                button.dataset.format === tshirtPrintFormat[tshirtSide]
            );
        });

    const sizeLabel = document.getElementById("tshirtSizeLabel");

    if (sizeLabel) {
        sizeLabel.textContent =
            tshirtFit === "kids" ? "Taglia (età)" : "Taglia";
    }

    const mobileSizeValue =
        document.getElementById("mobileTshirtSizeActionValue");

    if (mobileSizeValue) {
        mobileSizeValue.textContent =
            "Taglia attuale: " + tshirtSize +
            " · " + TSHIRT_FITS[tshirtFit].label;
    }
}


/*
    Sagoma della T-shirt per lato, colore e tessuto.
    Il poliestere ha la sua sagoma (solo bianca), uguale
    per adulto e bambino. Tutte le sagome hanno la stessa
    geometria: area di stampa e calibrazioni non cambiano.
*/
function getTshirtMockupPath(side, color, fabric) {

    const sideName =
        side === "back" ? "back" : "front";

    if (normalizeTshirtFabric(fabric) === "polyester") {
        return `assets/tshirt-polyester-${sideName}.png`;
    }

    return color === "black"
        ? `assets/tshirt-black-${sideName}.png`
        : `assets/tshirt-white-${sideName}.png`;
}


function updateTshirtMockup() {

    const imagePath =
        getTshirtMockupPath(tshirtSide, tshirtColor, tshirtFabric);


    productPreview.style.backgroundImage =
        `url("${imagePath}")`;

        if (window.innerWidth <= 600) {

    if (tshirtSide === "front") {

        productPreview.style.setProperty(
            "background-position",
            "calc(50% - 25px) center",
            "important"
        );

    } else {

        productPreview.style.setProperty(
            "background-position",
            "calc(50% + 34px) center",
            "important"
        );

    }

} else {

    productPreview.style.removeProperty(
        "background-position"
    );

}
}


productSelect.addEventListener("change", function () {

    syncSelectedTextFromLegacyState();
    
    currentProduct = this.value;

    previewZoom =
    currentProduct === "tshirt"
        ? (window.innerWidth <= 600 ? 100 : 150)
        : 100;

    uploadedImage.classList.remove("selected-element");
    customText.classList.remove("selected-element");

    selectionControls.style.display = "none";
    selectedElementType = null;

    if (currentProduct !== "tshirt") {
        tshirtSide = "front";
    }

    statusMessage.textContent = "";
    updateProductPreview();
    updatePreviewZoom();
});

centerImageButton.addEventListener("click", function () {

    const state = getCurrentState();

    if (!state.imageSrc) {
        statusMessage.textContent =
            "Carica prima un'immagine.";
        return;
    }

    saveHistoryState();

    state.x = 0;
    state.y = 0;

    updateImageTransform();

    statusMessage.textContent =
        "Immagine centrata.";
});

heartLogoButton.addEventListener(
    "click",
    function () {

        const state =
            getCurrentState();


        if (currentProduct !== "tshirt") {

            statusMessage.textContent =
                "Il preset lato cuore è disponibile solo per la T-Shirt.";

            return;
        }


        if (tshirtSide !== "front") {

            statusMessage.textContent =
                "Il logo lato cuore può essere applicato solo sul fronte.";

            return;
        }


        if (!state.imageSrc) {

            statusMessage.textContent =
                "Carica prima un'immagine.";

            return;
        }


        /*
            Salviamo posizione, dimensione
            e rotazione dell'immagine prima
            di applicare il preset lato cuore.
        */
        saveHistoryState();

        applyHeartLogoPreset();

    }
);

centerTextButton.addEventListener(
    "click",
    function () {

        const state =
            getCurrentState();

        if (!state.text.trim()) {

            statusMessage.textContent =
                "Aggiungi prima un testo.";

            return;
        }

        saveHistoryState();

        state.textX = 0;
        state.textY = 0;

        refreshTextLayout();

        statusMessage.textContent =
            "Testo centrato.";
    }
);


imageUpload.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];


        if (!file) {
            return;
        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            statusMessage.textContent =
                "Seleziona un file immagine valido.";

            return;
        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                const state =
                    getCurrentState();


                const newImage =
    createImageState(
        event.target.result
    );

/*
    Salviamo lo stato prima
    di aggiungere la nuova foto.
*/
saveHistoryState();


state.images.push(
    newImage
);


                setSelectedImage(
                    newImage.id
                );


                loadSelectedImageIntoLegacyState();


                renderCurrentState();

                if (window.innerWidth <= 600) {

    mobileDesignTools.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "mobile-design-open"
    );
}


                /*
                    Permette anche di scegliere
                    nuovamente lo stesso file.
                */
                imageUpload.value = "";


                statusMessage.textContent =
                    `Foto aggiunta. Totale: ${state.images.length}`;
            };


        reader.readAsDataURL(
            file
        );
    }
);


uploadedImage.addEventListener("pointerdown", function (event) {

    /*
        Salviamo la posizione prima
        del trascinamento diretto.
    */
    saveHistoryState();

    const state = getCurrentState();

    showSelectionControls(
        uploadedImage,
        "image"
    );

renderLayersPanel();

    isDragging = true;

    startX = event.clientX / getMobileTshirtDragScale() - state.x;
    startY = event.clientY / getMobileTshirtDragScale() - state.y;

    uploadedImage.style.cursor = "grabbing";

    event.preventDefault();
});


document.addEventListener("pointermove", function (event) {

    if (!isDragging) {
        return;
    }

    const state = getCurrentState();

    let newX = event.clientX / getMobileTshirtDragScale() - startX;
    let newY = event.clientY / getMobileTshirtDragScale() - startY;

    const snapDistance = 8;

    if (Math.abs(newX) <= snapDistance) {
        newX = 0;
        guideVertical.style.display = "block";
    } else {
        guideVertical.style.display = "none";
    }

    if (Math.abs(newY) <= snapDistance) {
        newY = 0;
        guideHorizontal.style.display = "block";
    } else {
        guideHorizontal.style.display = "none";
    }

    state.x = newX;
state.y = newY;

updateImageTransform();

keepImageInsidePrintArea();

showSelectionControls(
    uploadedImage,
    "image"
);
});


document.addEventListener("pointerup", function () {

    isDragging = false;

    uploadedImage.style.cursor = "grab";
    guideVertical.style.display = "none";
guideHorizontal.style.display = "none";
});
let isDraggingText = false;

let textStartX = 0;
let textStartY = 0;

customText.addEventListener("pointerdown", function (event) {

    if (!customText.textContent.trim()) {
        return;
    }

    selectedElementType = "text";

updateMobileTextSelectionBar();

    /*
        Salviamo la posizione prima
        del trascinamento diretto.
    */
    saveHistoryState();

    const state = getCurrentState();
    showSelectionControls(
    customText,
    "text"
);

renderLayersPanel();

    isDraggingText = true;

    textStartX = event.clientX / getMobileTshirtDragScale() - state.textX;
    textStartY = event.clientY / getMobileTshirtDragScale() - state.textY;

    customText.style.cursor = "grabbing";

    event.preventDefault();
});


document.addEventListener("pointermove", function (event) {

    if (!isDraggingText) {
        return;
    }

    const state = getCurrentState();

    let newX = event.clientX / getMobileTshirtDragScale() - textStartX;
    let newY = event.clientY / getMobileTshirtDragScale() - textStartY;
    const snapDistance = 8;

if (Math.abs(newX) <= snapDistance) {
    newX = 0;
    guideVertical.style.display = "block";
} else {
    guideVertical.style.display = "none";
}

if (Math.abs(newY) <= snapDistance) {
    newY = 0;
    guideHorizontal.style.display = "block";
} else {
    guideHorizontal.style.display = "none";
}

    state.textX = newX;
state.textY = newY;

updateTextTransform();

keepTextInsidePrintArea();

showSelectionControls(
    customText,
    "text"
);
});


document.addEventListener("pointerup", function () {

    isDraggingText = false;

    customText.style.cursor = "grab";

    guideVertical.style.display = "none";
guideHorizontal.style.display = "none";
});


/*
    Salviamo la dimensione della foto
    una sola volta, prima di iniziare
    a trascinare lo slider.
*/
zoomRange.addEventListener(
    "pointerdown",
    function () {

        const imageState =
            getSelectedImageState();

        if (!imageState) {
            return;
        }

        saveHistoryState();
    }
);

zoomRange.addEventListener(
    "input",
    function () {

        const state =
            getCurrentState();

        const minScale =
            getMinimumImageScale();

        const maxScale =
            getMaximumImageScale();


        state.scale =
            Math.max(
                minScale,
                Math.min(
                    maxScale,
                    Number(this.value)
                )
            );


        this.value =
            state.scale;


        updateImageTransform();

        keepImageInsidePrintArea();

        if (
            selectedElementType ===
            "image"
        ) {

            showSelectionControls(
                uploadedImage,
                "image"
            );
        }
    }
);


/*
    Salviamo la rotazione della foto
    una sola volta, prima di iniziare
    a trascinare lo slider.
*/
rotationRange.addEventListener(
    "pointerdown",
    function () {

        const imageState =
            getSelectedImageState();

        if (!imageState) {
            return;
        }

        saveHistoryState();
    }
);

rotationRange.addEventListener("input", function () {

    const state = getCurrentState();

    let newRotation = Number(this.value);

    const snapAngles = [
        -180,
        -90,
        -45,
        0,
        45,
        90,
        180
    ];

    const snapDistance = 3;

    let snappedAngle = null;

    snapAngles.forEach(function (angle) {

        if (
            Math.abs(newRotation - angle) <= snapDistance
        ) {
            newRotation = angle;
            snappedAngle = angle;
        }
    });

    state.rotation = newRotation;

    this.value = newRotation;

    rotationValue.textContent =
        `${state.rotation}°`;

    if (snappedAngle !== null) {
        statusMessage.textContent =
            `Rotazione immagine agganciata a ${snappedAngle}°`;
    }

    updateImageTransform();
    keepImageInsidePrintArea();
});

textInput.addEventListener(
    "beforeinput",
    function () {

        const textState =
            getSelectedTextState();

        if (!textState) {
            return;
        }

        /*
            Se è una scritta appena creata,
            createNewText() ha già salvato
            lo stato precedente alla creazione.

            NON salviamo altri snapshot
            mentre continuiamo a scriverla.
        */
        if (
            textState.id ===
            newlyCreatedTextId
        ) {
            return;
        }

        /*
            Per una scritta già esistente
            salviamo lo stato soltanto alla
            prima modifica della sessione.
        */
        if (!isEditingText) {

            saveHistoryState();

            isEditingText = true;
        }
    }
);

textInput.addEventListener(
    "blur",
    function () {

        /*
            Uscendo dal campo testo termina
            la sessione di scrittura.

            La prossima modifica sarà quindi
            una nuova operazione Annulla/Ripristina.
        */
        newlyCreatedTextId = null;
        isEditingText = false;
    }
);

textInput.addEventListener(
    "input",
    function () {

        const state =
            getCurrentState();

        const selectedText =
            getSelectedTextState();


        /*
            Se non esiste ancora una scritta,
            ne creiamo una nuova.
        */
        if (!selectedText) {

            createNewText();

            selectedElementType =
                "text";
        }


        /*
            Se stiamo modificando una scritta
            già esistente, salviamo il suo stato
            una sola volta prima della modifica.

            La scritta appena creata viene esclusa:
            la sua cronologia è già stata salvata
            da createNewText().
        */
        


        state.text =
            this.value;

        customText.textContent =
            state.text;

        syncSelectedTextFromLegacyState();
        renderMultiTexts();

        renderLayersPanel();


        /*
            Aspettiamo che il browser
            abbia applicato gli eventuali
            ritorni a capo.
        */
        requestAnimationFrame(
            function () {

                fitTextInsidePrintArea();
                keepTextInsidePrintArea();

                updateTextSizeInfo();

                if (
                    selectedElementType ===
                    "text"
                ) {

                    showSelectionControls(
                        customText,
                        "text"
                    );
                }

            }
        );
    }
);

addTextButton.addEventListener(
    "click",
    function () {

        createNewText();

        /*
    La creazione della nuova scritta
    ha già salvato lo stato nella cronologia.
    Evitiamo quindi un secondo salvataggio
    alla prima lettera digitata.
*/
isEditingText = true;


        selectedElementType =
            "text";


        renderCurrentState();

        if (window.innerWidth <= 600) {

    mobileDesignTools.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "mobile-design-open"
    );
}


        selectionControls.style.display =
            "none";


        textInput.focus();


        statusMessage.textContent =
            "Nuova scritta aggiunta.";
    }
);

fontSelect.addEventListener("change", function () {

    saveHistoryState();

    const state = getCurrentState();

    state.fontFamily = this.value;

    customText.style.fontFamily = state.fontFamily;
    requestAnimationFrame(function () {

    updateTextSizeInfo();

    if (
        selectedElementType === "text"
    ) {
        showSelectionControls(
            customText,
            "text"
        );
    }
});
});

boldButton.addEventListener("click", function () {

                /*
                Salviamo formato e personalizzazione
                prima di passare da verticale
                a orizzontale o viceversa.
            */
            saveHistoryState();

    saveHistoryState();

    const state = getCurrentState();

    state.textBold = !state.textBold;

    customText.style.fontWeight =
        state.textBold ? "700" : "400";

    boldButton.classList.toggle(
        "active",
        state.textBold
    );
    requestAnimationFrame(function () {

    updateTextSizeInfo();

    if (
        selectedElementType === "text"
    ) {
        showSelectionControls(
            customText,
            "text"
        );
    }
});
});


italicButton.addEventListener("click", function () {

    saveHistoryState();

    const state = getCurrentState();

    state.textItalic = !state.textItalic;

    customText.style.fontStyle =
        state.textItalic ? "italic" : "normal";

    italicButton.classList.toggle(
        "active",
        state.textItalic
    );
    requestAnimationFrame(function () {

    updateTextSizeInfo();

    if (
        selectedElementType === "text"
    ) {
        showSelectionControls(
            customText,
            "text"
        );
    }
});
});

/*
    Salviamo il colore del testo
    una sola volta, prima di iniziare
    a modificarlo.
*/
textColor.addEventListener(
    "pointerdown",
    function () {

        const textState =
            getSelectedTextState();

        if (!textState) {
            return;
        }

        saveHistoryState();
    }
);

textColor.addEventListener("input", function () {

    const state = getCurrentState();

    state.textColor = this.value;

    customText.style.color = state.textColor;
});

/*
    Salviamo lo sfondo dell'area di stampa
    una sola volta prima della modifica.
*/
printBgColor.addEventListener(
    "pointerdown",
    function () {

        saveHistoryState();
    }
);

printBgColor.addEventListener(
    "input",
    function () {

        const state =
            getCurrentState();

        state.printBgEnabled = true;

        state.printBgColor =
            this.value;

        printArea.style.backgroundColor =
            state.printBgColor;
    }
);


clearPrintBgButton.addEventListener(
    "click",
    function () {

        saveHistoryState();

        const state =
            getCurrentState();

        state.printBgEnabled = false;

        printArea.style.backgroundColor =
            "transparent";
    }
);

textOutlineEnabled.addEventListener(
    "change",
    function () {

        saveHistoryState();

        const state =
            getCurrentState();

        state.textOutlineEnabled =
            this.checked;

        customText.style.webkitTextStroke =
            state.textOutlineEnabled
                ? `${state.textOutlineWidth}px ${state.textOutlineColor}`
                : "0px transparent";
    }
);


textOutlineColor.addEventListener(
    "pointerdown",
    function () {

        const textState =
            getSelectedTextState();

        if (!textState) {
            return;
        }

        saveHistoryState();
    }
);

textOutlineColor.addEventListener(
    "input",
    function () {

        const state =
            getCurrentState();

        state.textOutlineColor =
            this.value;

        if (state.textOutlineEnabled) {

            customText.style.webkitTextStroke =
                `${state.textOutlineWidth}px ${state.textOutlineColor}`;
        }
    }
);


textOutlineWidth.addEventListener(
    "pointerdown",
    function () {

        const textState =
            getSelectedTextState();

        if (!textState) {
            return;
        }

        saveHistoryState();
    }
);

textOutlineWidth.addEventListener(
    "input",
    function () {

        const state =
            getCurrentState();

        state.textOutlineWidth =
            Number(this.value);

        textOutlineWidthValue.textContent =
            `${state.textOutlineWidth} px`;

        if (state.textOutlineEnabled) {

            customText.style.webkitTextStroke =
                `${state.textOutlineWidth}px ${state.textOutlineColor}`;
        }
    }
);

function fitTextInsidePrintArea() {

    const state =
        getCurrentState();

    if (!state.text.trim()) {
        return;
    }


    /*
        Facciamo al massimo 6 correzioni.
        Non usiamo un while infinito:
        così non rischiamo più di
        bloccare il browser.
    */
    for (let i = 0; i < 6; i++) {

        const areaRect =
            printArea.getBoundingClientRect();

        const textRect =
            customText.getBoundingClientRect();


        if (
            !areaRect.width ||
            !areaRect.height ||
            !textRect.width ||
            !textRect.height
        ) {
            return;
        }


        const widthRatio =
            areaRect.width /
            textRect.width;

        const heightRatio =
            areaRect.height /
            textRect.height;


        const fitRatio =
            Math.min(
                1,
                widthRatio,
                heightRatio
            );


        /*
            È già completamente dentro.
        */
        if (fitRatio >= 0.995) {
            break;
        }


        const newTextSize =
            Math.max(
                10,
                Math.floor(
                    state.textSize *
                    fitRatio *
                    0.96
                )
            );


        if (
            newTextSize >=
            state.textSize
        ) {
            break;
        }


        state.textSize =
            newTextSize;

        customText.style.fontSize =
            `${state.textSize}px`;

        textSizeRange.value =
            state.textSize;


        /*
            Se siamo arrivati alla
            dimensione minima,
            non continuiamo.
        */
        if (state.textSize === 10) {
            break;
        }
    }
}

function refreshTextLayout() {

    fitTextInsidePrintArea();
    keepTextInsidePrintArea();

    updateTextSizeInfo();
    updateSelectionSizeLabels();

    if (
        selectedElementType === "text" &&
        customText.textContent.trim()
    ) {
        showSelectionControls(
            customText,
            "text"
        );
    }
}

/*
    Salviamo la dimensione del testo
    una sola volta, prima di iniziare
    a trascinare lo slider.
*/
textSizeRange.addEventListener(
    "pointerdown",
    function () {

        const textState =
            getSelectedTextState();

        if (!textState) {
            return;
        }

        saveHistoryState();
    }
);

textSizeRange.addEventListener(
    "input",
    function () {

        const state =
            getCurrentState();

        state.textSize =
            Number(this.value);

        customText.style.fontSize =
            `${state.textSize}px`;

        refreshTextLayout();
    }
);

function keepTextInsidePrintArea() {

    const state = getCurrentState();

    updateTextTransform();

    const areaRect =
        printArea.getBoundingClientRect();

    const textRect =
        customText.getBoundingClientRect();

    const previewScale =
        previewZoom / 100;

    let correctionX = 0;
    let correctionY = 0;


    if (textRect.width <= areaRect.width) {

        if (textRect.left < areaRect.left) {

            correctionX +=
                (areaRect.left - textRect.left) /
                previewScale;
        }

        if (textRect.right > areaRect.right) {

            correctionX -=
                (textRect.right - areaRect.right) /
                previewScale;
        }

    } else {

        correctionX +=
            (
                (areaRect.left + areaRect.right) / 2 -
                (textRect.left + textRect.right) / 2
            ) / previewScale;
    }


    if (textRect.height <= areaRect.height) {

        if (textRect.top < areaRect.top) {

            correctionY +=
                (areaRect.top - textRect.top) /
                previewScale;
        }

        if (textRect.bottom > areaRect.bottom) {

            correctionY -=
                (textRect.bottom - areaRect.bottom) /
                previewScale;
        }

    } else {

        correctionY +=
            (
                (areaRect.top + areaRect.bottom) / 2 -
                (textRect.top + textRect.bottom) / 2
            ) / previewScale;
    }


    state.textX += correctionX;
    state.textY += correctionY;

    updateTextTransform();
}

/*
    Salviamo la rotazione del testo
    una sola volta, prima di iniziare
    a trascinare lo slider.
*/
textRotationRange.addEventListener(
    "pointerdown",
    function () {

        const textState =
            getSelectedTextState();

        if (!textState) {
            return;
        }

        saveHistoryState();
    }
);

textRotationRange.addEventListener("input", function () {

    const state = getCurrentState();

let newRotation = Number(this.value);

const snapAngles = [
    -180,
    -90,
    -45,
    0,
    45,
    90,
    180
];

const snapDistance = 3;

let snappedAngle = null;

snapAngles.forEach(function (angle) {

    if (
        Math.abs(newRotation - angle) <= snapDistance
    ) {
        newRotation = angle;
        snappedAngle = angle;
    }
});

state.textRotation = newRotation;

this.value = newRotation;

textRotationValue.textContent =
    `${state.textRotation}°`;

    textRotationValue.textContent =
    `${state.textRotation}°`;
    if (snappedAngle !== null) {

    statusMessage.textContent =
        `Rotazione agganciata a ${snappedAngle}°`;

}

    customText.style.transform =
        `translate(
            calc(-50% + ${state.textX}px),
            calc(-50% + ${state.textY}px)
        )
        rotate(${state.textRotation}deg)`;

    const areaRect = printArea.getBoundingClientRect();
    const textRect = customText.getBoundingClientRect();

    const halfTextWidth = textRect.width / 2;
    const halfTextHeight = textRect.height / 2;

    const maxX =
        (areaRect.width / 2) - halfTextWidth;

    const maxY =
        (areaRect.height / 2) - halfTextHeight;

    state.textX =
        Math.max(-maxX, Math.min(maxX, state.textX));

    state.textY =
        Math.max(-maxY, Math.min(maxY, state.textY));

    customText.style.transform =
        `translate(
            calc(-50% + ${state.textX}px),
            calc(-50% + ${state.textY}px)
        )
        rotate(${state.textRotation}deg)`;
        fitTextInsidePrintArea();
        keepTextInsidePrintArea();
});


document
    .querySelectorAll(".color-button")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            /*
                Salviamo le ultime modifiche
                del colore attuale prima
                di passare all'altro.
            */
            syncSelectedImageFromLegacyState();
            syncSelectedTextFromLegacyState();

            document
                .querySelectorAll(".color-button")
                .forEach(function (item) {
                    item.classList.remove("active");
                });

            this.classList.add("active");

            /*
                Cambiamo colore.
                Da questo momento getCurrentState()
                utilizzerà lo stato del nuovo colore.
            */
            tshirtColor = this.dataset.color;

            /*
                Deselezioniamo eventuali controlli
                appartenenti al vecchio colore.
            */
            selectedElementType = null;

            selectionControls.style.display =
                "none";

            /*
                Ricostruiamo completamente
                il nuovo stato.
            */
            updateTshirtMockup();
            renderCurrentState();
        });
    });

    document
    .querySelectorAll(".size-button")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            document
                .querySelectorAll(".size-button")
                .forEach(function (item) {

                    item.classList.remove("active");

                });

            this.classList.add("active");

            tshirtSize = this.dataset.size;

            statusMessage.textContent =
                `Taglia selezionata: ${tshirtSize}`;

            syncTshirtOptionButtons();

        });

    });


/* T-Shirt: pulsanti Tessuto (cotone/poliestere) e Modello (adulto/bambino) */
document
    .querySelectorAll("[data-tshirt-fabric]")
    .forEach(function (button) {

        button.addEventListener("click", function () {
            setTshirtVariant(this.dataset.tshirtFabric, tshirtFit, "fabric");
        });
    });

document
    .querySelectorAll("[data-tshirt-fit]")
    .forEach(function (button) {

        button.addEventListener("click", function () {
            setTshirtVariant(tshirtFabric, this.dataset.tshirtFit, "fit");
        });
    });


document
    .querySelectorAll(".side-button")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            document
                .querySelectorAll(".side-button")
                .forEach(function (item) {
                    item.classList.remove("active");
                });

            this.classList.add("active");

            syncSelectedTextFromLegacyState();
            tshirtSide = this.dataset.side;
            uploadedImage.classList.remove("selected-element");
customText.classList.remove("selected-element");

selectionControls.style.display = "none";

selectedElementType = null;
            if (tshirtSide === "back") {
    printArea.classList.add("tshirt-back-print-area");
} else {
    printArea.classList.remove("tshirt-back-print-area");
}
            document
    .querySelectorAll(".print-format-button")
    .forEach(function (item) {
        item.classList.toggle(
            "active",
            item.dataset.format === tshirtPrintFormat[tshirtSide]
        );
    });

updateTshirtPrintFormat();

            updateTshirtMockup();

            renderCurrentState();

            updatePreviewZoom();


            if (tshirtSide === "front") {

                statusMessage.textContent =
                    "Stai personalizzando il fronte.";

            } else {

                statusMessage.textContent =
                    "Stai personalizzando il retro.";
            }
        });
    });

    document
    .querySelectorAll(".print-format-button")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            document
                .querySelectorAll(".print-format-button")
                .forEach(function (item) {
                    item.classList.remove("active");
                });

            if (getTshirtFormats().indexOf(this.dataset.format) === -1) {
                return;
            }

            this.classList.add("active");

            tshirtPrintFormat[tshirtSide] = this.dataset.format;

updateTshirtPrintFormat();
        });
    });


resetButton.addEventListener("click", function () {

    resetCurrentState();

    statusMessage.textContent =
        "Personalizzazione del lato corrente azzerata.";
});

function updateTshirtPrintFormat() {

    console.log("🔥 TEST NUOVA FUNZIONE 18-09 🔥");

    if (currentProduct !== "tshirt") {
        return;
    }

    const isVertical =
        tshirtPrintFormat[tshirtSide] === "vertical";

    /*
    DIMENSIONI AREA DI STAMPA
    Desktop invariato - Mobile più compatto
*/
const printAreaPx = getTshirtPrintAreaPx(
    tshirtPrintFormat[tshirtSide],
    window.innerWidth <= 600
);

/* Il bordo tratteggiato non deve ridurre l'area utile (box-sizing: border-box) */
const printAreaStyle = getComputedStyle(printArea);
const printAreaBorderBox = printAreaStyle.boxSizing === "border-box";
const printAreaBorderX = printAreaBorderBox
    ? parseFloat(printAreaStyle.borderLeftWidth) + parseFloat(printAreaStyle.borderRightWidth)
    : 0;
const printAreaBorderY = printAreaBorderBox
    ? parseFloat(printAreaStyle.borderTopWidth) + parseFloat(printAreaStyle.borderBottomWidth)
    : 0;

printArea.style.width = printAreaPx.width + printAreaBorderX + "px";
printArea.style.height = printAreaPx.height + printAreaBorderY + "px";
/* Il riquadro è centrato con translate(-50%, -50%) dal CSS:
   quello del bambino, più piccolo, resta centrato nello stesso punto */


    /*
        MOBILE
        Centriamo visivamente l'area
        rispetto al mockup della maglietta.
    */
    if (window.innerWidth <= 600) {

        printArea.style.left = "51%";
printArea.style.transform =
    "translate(-50%, -50%)";

    } else {

        /*
            DESKTOP INVARIATO
        */
        printArea.style.transform = "";

        if (tshirtSide === "back") {
            printArea.style.left = "41%";
        } else {
            printArea.style.left = "58%";
        }
    }

    /* Altezza: bordo alto a 8-10 cm sotto il collo (computer e smartphone) */
    printArea.style.top =
        getTshirtPrintCenterPercent(
            tshirtSide,
            productPreview.clientWidth || 460,
            productPreview.clientHeight || 480,
            printAreaPx.height + printAreaBorderY,
            tshirtFit,
            tshirtFabric
        ) + "%";


    requestAnimationFrame(function () {

        updateMinimumImageScale();
        updateMaximumImageScale();

        fitImageInsidePrintArea();
        keepImageInsidePrintArea();

        fitTextInsidePrintArea();
        keepTextInsidePrintArea();

        updateImageSizeInfo();

        if (selectedElementType === "image") {

            showSelectionControls(
                uploadedImage,
                "image"
            );

        } else if (selectedElementType === "text") {

            showSelectionControls(
                customText,
                "text"
            );
        }
    });
}

let previewZoom = 100;

// Converte il movimento del puntatore nelle coordinate esistenti dell'editor.
// Gli altri prodotti e il desktop mantengono il comportamento attuale.
function getMobileTshirtDragScale() {
    return window.innerWidth <= 600 && currentProduct === "tshirt"
        ? previewZoom / 100
        : 1;
}

function updatePreviewZoom() {

        previewZoomRange.max =
        currentProduct === "tshirt"
            ? 180
            : 160;

    const scale = previewZoom / 100;

    let horizontalOffset = 0;

    if (currentProduct === "tshirt") {

    /*
        MOBILE:
        il mockup deve rimanere centrato nel configuratore.
    */
    if (window.innerWidth <= 600) {

        horizontalOffset = 0;

    } else {

        /*
            Desktop invariato.
        */
        if (tshirtSide === "front") {
            horizontalOffset = -37;
        } else {
            horizontalOffset = 41;
        }
    }
    }

    const scaledOffset =
        horizontalOffset * scale;

    productPreview.style.transform =
        `translateX(${scaledOffset}px) scale(${scale})`;

    productPreview.style.transformOrigin =
        "center center";

    /*
        Su mobile i comandi di selezione usano questa scala per
        restare della stessa misura sullo schermo a ogni zoom.
    */
    productPreview.style.setProperty(
        "--preview-scale",
        String(scale)
    );

    previewZoomRange.value = previewZoom;

    previewZoomValue.textContent =
        `${previewZoom}%`;

    mobileTshirtZoomValue.textContent = `${previewZoom}%`;
    document.body.classList.toggle(
        "mobile-tshirt-active",
        currentProduct === "tshirt"
    );
}


previewZoomRange.addEventListener("input", function () {

    previewZoom = Number(this.value);

    updatePreviewZoom();
});


zoomInPreviewButton.addEventListener("click", function () {

    const maxPreviewZoom =
    currentProduct === "tshirt"
        ? 180
        : 160;

previewZoom =
    Math.min(maxPreviewZoom, previewZoom + 5);

    updatePreviewZoom();
});


zoomOutPreviewButton.addEventListener("click", function () {

    previewZoom =
        Math.max(80, previewZoom - 5);

    updatePreviewZoom();
});


resetPreviewZoomButton.addEventListener("click", function () {

    previewZoom =
    currentProduct === "tshirt"
        ? (window.innerWidth <= 600 ? 100 : 150)
        : 100;

    updatePreviewZoom();
});

function createPreviewContent(
    preview,
    state
) {

    if (!state) {
        return;
    }


    if (state.imageSrc) {

        const image =
            document.createElement("img");

        image.src =
            state.imageSrc;

        image.className =
            "cart-preview-image";

        const flip =
            state.imageFlipped
                ? -1
                : 1;

        image.style.transform =
            `translate(
                calc(-50% + ${state.x / 5}px),
                calc(-50% + ${state.y / 5}px)
            )
            scaleX(${flip})
            rotate(${state.rotation}deg)`;

        preview.appendChild(image);
    }


    if (state.text) {

        const text =
            document.createElement("div");

        text.className =
            "cart-preview-text";

        text.textContent =
            state.text;

        text.style.fontFamily =
            state.fontFamily;

        text.style.color =
            state.textColor;

        text.style.fontWeight =
            state.textBold
                ? "700"
                : "400";

        text.style.fontStyle =
            state.textItalic
                ? "italic"
                : "normal";

        text.style.fontSize =
            `${Math.max(
                6,
                state.textSize / 5
            )}px`;


        const flip =
            state.textFlipped
                ? -1
                : 1;


        text.style.transform =
            `translate(
                calc(-50% + ${state.textX / 5}px),
                calc(-50% + ${state.textY / 5}px)
            )
            rotate(${state.textRotation}deg)
            scaleX(${flip})`;


        preview.appendChild(text);
    }
}

function createTshirtSidePreview(
    item,
    side,
    labelText
) {

    const block =
        document.createElement("div");

    block.className =
        "cart-side-preview-block";


    const label =
        document.createElement("div");

    label.className =
        "cart-side-preview-label";

    label.textContent =
        labelText;


    const preview =
        document.createElement("div");

    preview.className =
        "cart-side-preview tshirt";


    const imagePath =
        getTshirtMockupPath(side, item.tshirtColor, item.tshirtFabric);


    preview.style.backgroundImage =
        `url("${imagePath}")`;


    const state =
        item.customization[side];


    if (state) {

        createPreviewContent(
            preview,
            state
        );
    }


    block.appendChild(label);
    block.appendChild(preview);

    return block;
}


function createTshirtCartPreviewElement(side) {

    const state =
        productStates.tshirt[side];


    /*
        CONTENITORE PRINCIPALE
    */
    const preview =
        document.createElement(
            "div"
        );


    preview.style.position =
    "absolute";

preview.style.left =
    "20px";

preview.style.top =
    `${window.scrollY + window.innerHeight + 100}px`;

preview.style.zIndex =
    "999999";

preview.style.pointerEvents =
    "none";

    preview.style.width =
        "420px";

    preview.style.height =
        "420px";

    preview.style.backgroundRepeat =
        "no-repeat";

    preview.style.backgroundPosition =
        "center";

    preview.style.backgroundSize =
        "contain";

    preview.style.overflow =
        "hidden";


    /*
        MOCKUP T-SHIRT
    */
    const mockupPath =
        getTshirtMockupPath(side, tshirtColor, tshirtFabric);


    preview.style.backgroundImage =
        `url("${mockupPath}")`;


    /*
        AREA DI STAMPA
    */
    const printAreaCopy =
        document.createElement(
            "div"
        );


    printAreaCopy.style.position =
        "absolute";

    printAreaCopy.style.overflow =
        "hidden";


    /*
        Dimensioni area stampa.
    */
    const format =
        tshirtPrintFormat[side];


    const copyAreaPx =
        getTshirtPrintAreaPx(format, false);

    printAreaCopy.style.width =
        copyAreaPx.width + "px";

    printAreaCopy.style.height =
        copyAreaPx.height + "px";

    printAreaCopy.style.top =
        getTshirtPrintCenterPercent(side, 420, 420, copyAreaPx.height) + "%";


    /*
        Posizione orizzontale reale
        dell'area di stampa.
    */
    printAreaCopy.style.left =
        side === "back"
            ? "41%"
            : "58%";


    printAreaCopy.style.transform =
        "translate(-50%, -50%)";


    /*
        Sfondo personalizzato area stampa.
    */
    if (
        state.printBgEnabled
    ) {

        printAreaCopy.style.backgroundColor =
            state.printBgColor;

    } else {

        printAreaCopy.style.backgroundColor =
            "transparent";
    }


    preview.appendChild(
        printAreaCopy
    );


    /*
        FOTO
    */
    state.images.forEach(
        function (imageState) {

            if (
                imageState.visible === false
            ) {
                return;
            }


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                imageState.src;

            image.alt =
                "";


            image.style.position =
                "absolute";

            image.style.left =
                "50%";

            image.style.top =
                "50%";

            image.style.width =
                "100%";

            image.style.height =
                "auto";

            image.style.maxWidth =
                "none";

            image.style.maxHeight =
                "none";

            image.style.transformOrigin =
                "center center";


            const scaleX =
                imageState.flipped
                    ? -imageState.scale
                    : imageState.scale;


            image.style.transform =
                `translate(
                    calc(-50% + ${imageState.x}px),
                    calc(-50% + ${imageState.y}px)
                )
                scale(
                    ${scaleX},
                    ${imageState.scale}
                )
                rotate(${imageState.rotation}deg)`;


            image.style.zIndex =
                imageState.layer;


            printAreaCopy.appendChild(
                image
            );
        }
    );


    /*
        TESTI
    */
    state.texts.forEach(
        function (textState) {

            if (
                textState.visible === false ||
                !textState.text
            ) {
                return;
            }


            const text =
                document.createElement(
                    "div"
                );


            text.textContent =
                textState.text;


            text.style.position =
                "absolute";

            text.style.left =
                "50%";

            text.style.top =
                "50%";

            text.style.width =
                "max-content";

            text.style.maxWidth =
                "100%";

            text.style.height =
                "auto";

            text.style.whiteSpace =
                "pre-wrap";

            text.style.overflowWrap =
                "anywhere";

            text.style.wordBreak =
                "break-word";

            text.style.lineHeight =
                "1.15";


            text.style.fontSize =
                `${textState.size}px`;

            text.style.fontFamily =
                textState.fontFamily;

            text.style.color =
                textState.color;

            text.style.fontWeight =
                textState.bold
                    ? "700"
                    : "400";

            text.style.fontStyle =
                textState.italic
                    ? "italic"
                    : "normal";

            text.style.textAlign =
                textState.align ||
                "center";


            text.style.webkitTextStroke =
                textState.outlineEnabled
                    ? `${textState.outlineWidth}px ${textState.outlineColor}`
                    : "0px transparent";


            const scaleX =
                textState.flipped
                    ? -1
                    : 1;


            text.style.transform =
                `translate(
                    calc(-50% + ${textState.x}px),
                    calc(-50% + ${textState.y}px)
                )
                rotate(${textState.rotation}deg)
                scaleX(${scaleX})`;


            text.style.zIndex =
                textState.layer;


            printAreaCopy.appendChild(
                text
            );
        }
    );


    document.body.appendChild(
        preview
    );


    return preview;
}

function loadCanvasImage(src) {

    return new Promise(
        function (resolve, reject) {

            const image =
                new Image();


            image.onload =
                function () {
                    resolve(image);
                };


            image.onerror =
                reject;


            image.src =
                src;
        }
    );
}



function wrapCanvasText(
    context,
    text,
    maxWidth
) {

    const paragraphs =
        String(text).split("\n");


    const lines = [];


    paragraphs.forEach(
        function (paragraph) {

            const words =
                paragraph.split(" ");


            let currentLine =
                "";


            words.forEach(
                function (word) {

                    const testLine =
                        currentLine
                            ? currentLine + " " + word
                            : word;


                    const width =
                        context.measureText(
                            testLine
                        ).width;


                    if (
                        width > maxWidth &&
                        currentLine
                    ) {

                        lines.push(
                            currentLine
                        );

                        currentLine =
                            word;

                    } else {

                        currentLine =
                            testLine;
                    }
                }
            );


            lines.push(
                currentLine
            );
        }
    );


    return lines;
}



/*
    Disegna sfondo, foto e testi di un lato
    dentro l'area di stampa, nell'ordine dei livelli.

    area: { left, top, width, height, centerX, centerY }
    in pixel dell'editor (le coordinate salvate x/y
    sono relative al centro dell'area).

    Usata sia dall'anteprima Canvas della T-shirt
    nel carrello sia dai file di stampa.
*/
async function drawPrintAreaContent(
    context,
    state,
    area
) {

    const areaLeft = area.left;
    const areaTop = area.top;
    const areaWidth = area.width;
    const areaHeight = area.height;
    const areaCenterX = area.centerX;
    const areaCenterY = area.centerY;


    /*
        Salviamo il canvas e limitiamo
        tutto all'area di stampa.
    */
    context.save();


    context.beginPath();

    context.rect(
        areaLeft,
        areaTop,
        areaWidth,
        areaHeight
    );

    context.clip();


    /*
        Sfondo area stampa
    */
    if (
        state.printBgEnabled
    ) {

        context.fillStyle =
            state.printBgColor;


        context.fillRect(
            areaLeft,
            areaTop,
            areaWidth,
            areaHeight
        );
    }


    /*
        =========================
        LIVELLI
        =========================

        Mettiamo foto e testi nello
        stesso array e li ordiniamo
        in base al layer.
    */
    const elements = [];


    state.images.forEach(
        function (imageState) {

            if (
                imageState.visible ===
                false
            ) {
                return;
            }


            elements.push({
                type:
                    "image",

                layer:
                    imageState.layer,

                state:
                    imageState
            });
        }
    );


    state.texts.forEach(
        function (textState) {

            if (
                textState.visible ===
                    false ||
                !textState.text
            ) {
                return;
            }


            elements.push({
                type:
                    "text",

                layer:
                    textState.layer,

                state:
                    textState
            });
        }
    );


    elements.sort(
        function (a, b) {

            return (
                a.layer -
                b.layer
            );
        }
    );


    /*
        =========================
        DISEGNO LIVELLI
        =========================
    */
    for (
        const element of elements
    ) {

        /*
            FOTO
        */
        if (
            element.type ===
            "image"
        ) {

            const imageState =
                element.state;


            const image =
                await loadCanvasImage(
                    imageState.src
                );


            /*
                Nell'editor l'immagine base
                ha larghezza = 100%
                dell'area di stampa.
            */
            const baseWidth =
                areaWidth;


            const baseHeight =
                image.naturalHeight /
                image.naturalWidth *
                baseWidth;


            context.save();


            context.translate(
                areaCenterX +
                    imageState.x,

                areaCenterY +
                    imageState.y
            );


            /*
                Stesso ordine dell'editor (CSS):
                translate → scale → rotate.
                Con foto specchiata e ruotata
                l'ordine cambia il risultato.
            */
            context.scale(
                imageState.flipped
                    ? -imageState.scale
                    : imageState.scale,

                imageState.scale
            );


            context.rotate(
                imageState.rotation *
                Math.PI /
                180
            );


            context.drawImage(
                image,
                -baseWidth / 2,
                -baseHeight / 2,
                baseWidth,
                baseHeight
            );


            context.restore();
        }


        /*
            TESTO
        */
        if (
            element.type ===
            "text"
        ) {

            const textState =
                element.state;


            context.save();


            context.translate(
                areaCenterX +
                    textState.x,

                areaCenterY +
                    textState.y
            );


            context.rotate(
                textState.rotation *
                Math.PI /
                180
            );


            context.scale(
                textState.flipped
                    ? -1
                    : 1,
                1
            );


            const fontStyle =
                textState.italic
                    ? "italic"
                    : "normal";


            const fontWeight =
                textState.bold
                    ? "700"
                    : "400";


            context.font =
                `${fontStyle} ${fontWeight} ${textState.size}px ${textState.fontFamily}`;


            context.textBaseline =
                "middle";


            const lines =
                wrapCanvasText(
                    context,
                    textState.text,
                    areaWidth
                );


            const lineHeight =
                textState.size *
                1.15;


            /*
                La larghezza del blocco testo
                corrisponde alla riga più larga.
            */
            let blockWidth =
                0;


            lines.forEach(
                function (line) {

                    blockWidth =
                        Math.max(
                            blockWidth,
                            context.measureText(
                                line
                            ).width
                        );
                }
            );


            blockWidth =
                Math.min(
                    blockWidth,
                    areaWidth
                );


            lines.forEach(
                function (
                    line,
                    index
                ) {

                    let textX =
                        0;


                    if (
                        textState.align ===
                        "left"
                    ) {

                        context.textAlign =
                            "left";

                        textX =
                            -blockWidth / 2;

                    } else if (
                        textState.align ===
                        "right"
                    ) {

                        context.textAlign =
                            "right";

                        textX =
                            blockWidth / 2;

                    } else {

                        context.textAlign =
                            "center";

                        textX =
                            0;
                    }


                    const textY =
                        (
                            index -
                            (
                                lines.length -
                                1
                            ) / 2
                        ) *
                        lineHeight;


                    /*
                        Contorno
                    */
                    if (
                        textState
                            .outlineEnabled
                    ) {

                        context.lineJoin =
                            "round";

                        context.miterLimit =
                            2;

                        context.lineWidth =
                            textState
                                .outlineWidth *
                            2;

                        context.strokeStyle =
                            textState
                                .outlineColor;


                        context.strokeText(
                            line,
                            textX,
                            textY
                        );
                    }


                    /*
                        Riempimento testo
                    */
                    context.fillStyle =
                        textState.color;


                    context.fillText(
                        line,
                        textX,
                        textY
                    );
                }
            );


            context.restore();
        }
    }


    /*
        Chiude il clipping.
    */
    context.restore();
}

async function createTshirtCartCanvas(side, options) {

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        420;

    canvas.height =
        420;


    const context =
        canvas.getContext(
            "2d"
        );


    /* options.state: copia dello stato (miniature fronte/retro) */
    const state =
        options && options.state
            ? options.state
            : productStates.tshirt[tshirtColor][side];


    /*
        =========================
        MOCKUP T-SHIRT
        =========================
    */
    const mockupPath =
        getTshirtMockupPath(side, tshirtColor, tshirtFabric);


    const mockupImage =
        await loadCanvasImage(
            mockupPath
        );


    /*
        Equivalente a:
        background-size: contain;
    */
    const mockupScale =
        Math.min(
            canvas.width /
                mockupImage.naturalWidth,

            canvas.height /
                mockupImage.naturalHeight
        );


    const mockupWidth =
        mockupImage.naturalWidth *
        mockupScale;


    const mockupHeight =
        mockupImage.naturalHeight *
        mockupScale;


    const mockupX =
        (
            canvas.width -
            mockupWidth
        ) / 2;


    const mockupY =
        (
            canvas.height -
            mockupHeight
        ) / 2;


    context.drawImage(
        mockupImage,
        mockupX,
        mockupY,
        mockupWidth,
        mockupHeight
    );


    /*
        =========================
        AREA DI STAMPA
        =========================
    */
    const format =
        tshirtPrintFormat[side];


    /* Misure del riquadro (bambino più piccolo, vedi getTshirtPrintAreaPx) */
    const cartAreaPx =
        getTshirtPrintAreaPx(format, false);

    let areaWidth;
    let areaHeight;
    let areaTopPercent;


    if (
        format === "vertical"
    ) {

        areaWidth =
            cartAreaPx.width;

        areaHeight =
            cartAreaPx.height;

        areaTopPercent =
            getTshirtPrintCenterPercent(
                side,
                canvas.width,
                canvas.height,
                cartAreaPx.height
            );

    } else {

        areaWidth =
            cartAreaPx.width;

        areaHeight =
            cartAreaPx.height;

        areaTopPercent =
            getTshirtPrintCenterPercent(
                side,
                canvas.width,
                canvas.height,
                cartAreaPx.height
            );
    }


    const areaLeftPercent =
        side === "back"
            ? 41
            : 58;


    const areaCenterX =
        canvas.width *
        areaLeftPercent /
        100;


    const areaCenterY =
        canvas.height *
        areaTopPercent /
        100;


    const areaLeft =
        areaCenterX -
        areaWidth / 2;


    const areaTop =
        areaCenterY -
        areaHeight / 2;


    await drawPrintAreaContent(
        context,
        state,
        {
            left: areaLeft,
            top: areaTop,
            width: areaWidth,
            height: areaHeight,
            centerX: areaCenterX,
            centerY: areaCenterY
        }
    );


    return canvas;
}

async function captureTshirtSide(side) {

    const canvas =
        await createTshirtCartCanvas(
            side
        );


    /*
        Riduciamo l'immagine
        per il carrello.
    */
    const maxSize =
        320;


    const ratio =
        Math.min(
            maxSize / canvas.width,
            maxSize / canvas.height,
            1
        );


    const smallCanvas =
        document.createElement(
            "canvas"
        );


    smallCanvas.width =
        Math.round(
            canvas.width *
            ratio
        );


    smallCanvas.height =
        Math.round(
            canvas.height *
            ratio
        );


    const context =
        smallCanvas.getContext(
            "2d"
        );


    /* Il JPEG non ha trasparenza: fondo bianco, non nero */
    context.fillStyle =
        "#ffffff";

    context.fillRect(
        0,
        0,
        smallCanvas.width,
        smallCanvas.height
    );


    context.drawImage(
        canvas,
        0,
        0,
        smallCanvas.width,
        smallCanvas.height
    );


    return smallCanvas.toDataURL(
        "image/jpeg",
        0.85
    );
}

async function captureTshirtPreviews() {

    const frontPreview =
        await captureTshirtSide(
            "front"
        );

    const backPreview =
        await captureTshirtSide(
            "back"
        );


    return {
        front: frontPreview,
        back: backPreview
    };
}


/*
    ============================
    FILE DI STAMPA
    ============================

    Per ogni lato personalizzato generiamo un PNG
    a 300 dpi della sola area stampabile, con le
    misure reali (es. 20x30 cm = 2362x3543 px).
    Lo sfondo resta trasparente se non è stato
    scelto un colore di sfondo.
*/

const PRINT_FILE_DPI = 300;


/*
    Misure di riserva (desktop, finestra 1024 px)
    per articoli aggiunti al carrello prima che
    venisse salvata la misura reale dell'area.
*/
const FALLBACK_PRINT_AREA_PX = {
    cushion: { width: 312, height: 312 },
    keychain: { width: 322, height: 322 },
    tshirtVertical: { width: 92, height: 139 }
};


/*
    Misura in pixel dell'area di stampa così come
    la vede il cliente quando aggiunge al carrello.
    Le coordinate salvate (x, y, dimensione testo)
    sono espresse in questi pixel, come per le
    misure in cm mostrate nell'editor.
*/
function getPrintAreaPxForCart() {

    const current = {
        width: printArea.clientWidth,
        height: printArea.clientHeight
    };

    if (currentProduct !== "tshirt") {

        /* Portachiavi: il retro ha la stessa area del fronte */
        if (isDoubleSidedProduct(currentProduct)) {
            return {
                front: current,
                back: { width: current.width, height: current.height }
            };
        }

        return {
            front: current
        };
    }

    /*
        Il lato non visibile ha la stessa area se ha lo stesso
        formato; altrimenti si calcola: verticale e orizzontale
        non sono sempre lo stesso rettangolo ruotato (es. 21x30
        e 30x20 sul cotone).
    */
    const sizes = {};

    ["front", "back"].forEach(function (side) {

        const sameFormat =
            tshirtPrintFormat[side] ===
            tshirtPrintFormat[tshirtSide];

        if (sameFormat) {
            sizes[side] = {
                width: current.width,
                height: current.height
            };
            return;
        }

        const otherPx = getTshirtPrintAreaPx(
            tshirtPrintFormat[side],
            window.innerWidth <= 600
        );

        sizes[side] = {
            width: otherPx.width,
            height: otherPx.height
        };
    });

    return sizes;
}


function getCartItemSideState(cartItem, side) {

    if (cartItem.product === "tshirt") {

        return cartItem.customization
            ? cartItem.customization[side]
            : null;
    }

    /* Portachiavi fronte/retro: { front, back } */
    if (
        isDoubleSidedProduct(cartItem.product) &&
        cartItem.customization &&
        cartItem.customization.front
    ) {
        return cartItem.customization[side] || null;
    }

    return side === "front"
        ? cartItem.customization
        : null;
}


function getCartItemSideFormat(cartItem, side) {

    if (
        cartItem.product === "tshirt" &&
        cartItem.printFormat
    ) {
        return cartItem.printFormat[side];
    }

    return null;
}


/*
    Misure reali di stampa di un articolo del carrello:
    formato del lato, modello T-shirt e orientamento
    salvati nell'articolo.
*/
function getCartItemPrintAreaCm(cartItem, side) {

    return getPrintAreaCm(
        cartItem.product,
        getCartItemSideFormat(cartItem, side),
        {
            fit: cartItem.tshirtFit || "adult",
            fabric: cartItem.tshirtFabric || "cotton",
            orientation: cartItem.orientation || null
        }
    );
}


function getCartItemPrintAreaPx(cartItem, side) {

    if (
        cartItem.printAreaPx &&
        cartItem.printAreaPx[side]
    ) {
        return cartItem.printAreaPx[side];
    }

    if (cartItem.product === "tshirt") {

        const vertical =
            FALLBACK_PRINT_AREA_PX.tshirtVertical;

        return getCartItemSideFormat(cartItem, side) === "vertical"
            ? { width: vertical.width, height: vertical.height }
            : { width: vertical.height, height: vertical.width };
    }

    return FALLBACK_PRINT_AREA_PX[cartItem.product];
}


/*
    Un lato va stampato se ha almeno una foto
    o un testo visibile, oppure uno sfondo.
*/
function hasPrintContent(state) {

    if (!state) {
        return false;
    }

    if (state.printBgEnabled) {
        return true;
    }

    const hasImage =
        Array.isArray(state.images) &&
        state.images.some(function (imageState) {
            return imageState.visible !== false;
        });

    const hasText =
        Array.isArray(state.texts) &&
        state.texts.some(function (textState) {
            return (
                textState.visible !== false &&
                Boolean(textState.text)
            );
        });

    return hasImage || hasText;
}


async function createPrintFileCanvas(cartItem, side) {

    const state =
        getCartItemSideState(cartItem, side);

    const areaCm =
        getCartItemPrintAreaCm(cartItem, side);

    const areaPx =
        getCartItemPrintAreaPx(cartItem, side);

    const pixelsPerCm =
        PRINT_FILE_DPI / 2.54;


    const canvas =
        document.createElement("canvas");

    canvas.width =
        Math.round(areaCm.width * pixelsPerCm);

    canvas.height =
        Math.round(areaCm.height * pixelsPerCm);


    const context =
        canvas.getContext("2d");

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";


    /*
        Disegniamo con le coordinate dell'editor
        e ingrandiamo fino alla misura di stampa.
    */
    context.scale(
        canvas.width / areaPx.width,
        canvas.height / areaPx.height
    );


    await drawPrintAreaContent(
        context,
        state,
        {
            left: 0,
            top: 0,
            width: areaPx.width,
            height: areaPx.height,
            centerX: areaPx.width / 2,
            centerY: areaPx.height / 2
        }
    );

    return canvas;
}


/*
    Aggiunge al PNG la risoluzione (chunk pHYs),
    così i programmi di stampa lo aprono già
    alla misura reale invece che a 72 dpi.
*/
const PNG_CRC_TABLE = (function () {

    const table = new Uint32Array(256);

    for (let n = 0; n < 256; n++) {

        let c = n;

        for (let k = 0; k < 8; k++) {
            c = c & 1
                ? 0xedb88320 ^ (c >>> 1)
                : c >>> 1;
        }

        table[n] = c >>> 0;
    }

    return table;
})();


function getPngCrc(bytes) {

    let crc = 0xffffffff;

    for (let i = 0; i < bytes.length; i++) {
        crc = PNG_CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    }

    return (crc ^ 0xffffffff) >>> 0;
}


async function addPngResolution(pngBlob, dpi) {

    const bytes =
        new Uint8Array(await pngBlob.arrayBuffer());

    /*
        Firma PNG (8 byte) + chunk IHDR (25 byte):
        il chunk pHYs va subito dopo.
    */
    const insertAt = 8 + 25;

    const pixelsPerMeter =
        Math.round(dpi / 0.0254);

    const chunk = new Uint8Array(21);
    const view = new DataView(chunk.buffer);

    view.setUint32(0, 9);
    chunk.set([0x70, 0x48, 0x59, 0x73], 4); // "pHYs"
    view.setUint32(8, pixelsPerMeter);
    view.setUint32(12, pixelsPerMeter);
    chunk[16] = 1; // unità: metro

    view.setUint32(
        17,
        getPngCrc(chunk.subarray(4, 17))
    );

    return new Blob(
        [
            bytes.subarray(0, insertAt),
            chunk,
            bytes.subarray(insertAt)
        ],
        { type: "image/png" }
    );
}


/*
    Restituisce i file di stampa di un articolo
    del carrello: un elemento per ogni lato
    personalizzato.
*/
async function createPrintFiles(cartItem) {

    const sides =
        cartItem.product === "tshirt" ||
        isDoubleSidedProduct(cartItem.product)
            ? ["front", "back"]
            : ["front"];

    const files = [];

    for (const side of sides) {

        const state =
            getCartItemSideState(cartItem, side);

        if (!hasPrintContent(state)) {
            continue;
        }

        const canvas =
            await createPrintFileCanvas(cartItem, side);

        const pngBlob =
            await new Promise(function (resolve, reject) {
                canvas.toBlob(function (blob) {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error("Impossibile creare il file di stampa."));
                    }
                }, "image/png");
            });

        const areaCm =
            getCartItemPrintAreaCm(cartItem, side);

        files.push({
            side: side,
            blob: await addPngResolution(pngBlob, PRINT_FILE_DPI),
            widthPx: canvas.width,
            heightPx: canvas.height,
            widthCm: areaCm.width,
            heightCm: areaCm.height,
            dpi: PRINT_FILE_DPI
        });

        /* Libera subito la memoria del canvas grande. */
        canvas.width = 0;
        canvas.height = 0;
    }

    return files;
}

/*
    Portachiavi: anteprima del fronte e, se è personalizzato,
    anche del retro. Restituisce { front, back } oppure solo
    l'immagine del fronte.
*/
async function captureKeychainPreviews() {

    const originalSide = keychainSide;
    const previews = {};

    for (const side of ["front", "back"]) {

        if (
            side === "back" &&
            !hasPrintContent(productStates[currentProduct].back)
        ) {
            continue;
        }

        if (keychainSide !== side) {
            keychainSide = side;
            updateProductPreview();
        }

        previews[side] = await captureCurrentProductPreview();
    }

    if (keychainSide !== originalSide) {
        keychainSide = originalSide;
        updateProductPreview();
    }

    return previews.back ? previews : previews.front;
}

async function captureCurrentProductPreview() {

    const originalZoom =
        previewZoom;

    const originalSelectedElement =
        selectedElementType;


    try {

        /*
            Assicuriamoci che anche
            l'ultima modifica alla foto
            selezionata sia salvata.
        */
        syncSelectedImageFromLegacyState();


        /*
            Lo screenshot viene sempre
            catturato al 100%.
        */
        previewZoom = 100;

        updatePreviewZoom();


        /*
            Nascondiamo tutti i controlli
            dell'editor.
        */
        selectionControls.style.display =
            "none";

        uploadedImage.classList.remove(
            "selected-element"
        );

        customText.classList.remove(
            "selected-element"
        );

        guideVertical.style.display =
            "none";

        guideHorizontal.style.display =
            "none";

        rotationGuide.style.display =
            "none";


        /*
            Aspettiamo che il browser
            abbia completato il disegno.
        */
        await new Promise(
            function (resolve) {

                requestAnimationFrame(
                    function () {

                        requestAnimationFrame(
                            resolve
                        );
                    }
                );
            }
        );


        /*
            Aspettiamo tutte le immagini
            presenti nell'anteprima.
        */
        const previewImages =
            Array.from(
                productPreview.querySelectorAll(
                    "img"
                )
            );


        await Promise.all(
            previewImages.map(
                function (image) {

                    if (image.complete) {
                        return Promise.resolve();
                    }


                    return new Promise(
                        function (resolve) {

                            image.addEventListener(
                                "load",
                                resolve,
                                { once: true }
                            );

                            image.addEventListener(
                                "error",
                                resolve,
                                { once: true }
                            );
                        }
                    );
                }
            )
        );


        /*
            Sagome (cuori, portachiavi, ardesie...): fuori dalla forma
            le maschere hanno il grigio dell'anteprima, quindi anche il
            fondo della miniatura è grigio, senza riquadri chiari.
        */
        const thumbnailBackground =
            products[currentProduct] &&
            products[currentProduct].shape
                ? getComputedStyle(document.documentElement)
                    .getPropertyValue("--preview-bg")
                    .trim() || null
                : null;

        const canvas =
            await html2canvas(
                productPreview,
                {
                    backgroundColor:
                        thumbnailBackground,

                    scale: 1,

                    onclone:
                        function (
                            clonedDocument
                        ) {

                            const clonedPrintArea =
                                clonedDocument
                                    .getElementById(
                                        "printArea"
                                    );

                            const clonedSelection =
                                clonedDocument
                                    .getElementById(
                                        "selectionControls"
                                    );


                            if (
                                clonedSelection
                            ) {

                                clonedSelection
                                    .style
                                    .display =
                                    "none";
                            }


                            if (
                                clonedPrintArea
                            ) {

                                clonedPrintArea
                                    .style
                                    .border =
                                    "none";
                            }


                            clonedDocument
                                .querySelectorAll(
                                    ".selected-element"
                                )
                                .forEach(
                                    function (
                                        element
                                    ) {

                                        element
                                            .classList
                                            .remove(
                                                "selected-element"
                                            );
                                    }
                                );


                            clonedDocument
                                .querySelectorAll(
                                    ".guide-line, .center-guide, .rotation-guide"
                                )
                                .forEach(
                                    function (
                                        element
                                    ) {

                                        element
                                            .style
                                            .display =
                                            "none";
                                    }
                                );
                        }
                }
            );


        /*
            Riduciamo lo screenshot
            prima di salvarlo nel carrello.
        */
        const maxSize = 320;


        const ratio =
            Math.min(
                maxSize /
                    canvas.width,

                maxSize /
                    canvas.height,

                1
            );


        const smallCanvas =
            document.createElement(
                "canvas"
            );


        smallCanvas.width =
            Math.round(
                canvas.width *
                ratio
            );

        smallCanvas.height =
            Math.round(
                canvas.height *
                ratio
            );


        const context =
            smallCanvas.getContext(
                "2d"
            );


        /*
            Il JPEG non ha trasparenza: senza
            questo fondo bianco gli angoli
            arrotondati e l'esterno delle
            sagome diventerebbero neri.
        */
        context.fillStyle =
            "#ffffff";

        context.fillRect(
            0,
            0,
            smallCanvas.width,
            smallCanvas.height
        );


        context.drawImage(
            canvas,
            0,
            0,
            smallCanvas.width,
            smallCanvas.height
        );


        return smallCanvas.toDataURL(
            "image/jpeg",
            0.85
        );

    } finally {

        /*
            Riportiamo l'editor
            esattamente com'era.
        */
        previewZoom =
            originalZoom;

        updatePreviewZoom();


        selectedElementType =
            originalSelectedElement;


        if (
            originalSelectedElement ===
                "image" &&
            getSelectedImageState()
        ) {

            requestAnimationFrame(
                function () {

                    showSelectionControls(
                        uploadedImage,
                        "image"
                    );
                }
            );

        } else if (
            originalSelectedElement ===
                "text" &&
            customText.textContent.trim()
        ) {

            requestAnimationFrame(
                function () {

                    showSelectionControls(
                        customText,
                        "text"
                    );
                }
            );
        }
    }
}

function createCartPreview(item) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "cart-preview-wrapper";


    // =========================
    // T-SHIRT CON FOTO REALI
    // =========================

    if (
        (item.product === "tshirt" ||
            isDoubleSidedProduct(item.product)) &&
        item.previews &&
        item.previews.front &&
        item.previews.back
    ) {

        const sides = [
            {
                key: "front",
                label: "Fronte"
            },
            {
                key: "back",
                label: "Retro"
            }
        ];


        sides.forEach(function (side) {

            const block =
                document.createElement("div");

            block.className =
                "cart-side-preview-block";


            const label =
                document.createElement("div");

            label.className =
                "cart-side-preview-label";

            label.textContent =
                side.label;


            const preview =
                document.createElement("div");

            preview.className =
                "cart-side-preview";


            const image =
                document.createElement("img");

            image.className =
                "cart-snapshot-image";

            image.src =
                item.previews[side.key];


            preview.appendChild(image);

            block.appendChild(label);
            block.appendChild(preview);

            wrapper.appendChild(block);
        });


        return wrapper;
    }


    // =========================
// CUSCINO / PORTACHIAVI
// CON SCREENSHOT REALE
// =========================

if (
    item.product !== "tshirt" &&
    typeof item.previews === "string" &&
    item.previews
) {

    const preview =
        document.createElement(
            "div"
        );

    preview.className =
        `cart-side-preview ${item.product}`;


    const image =
        document.createElement(
            "img"
        );

    image.className =
        "cart-snapshot-image";

    image.src =
        item.previews;


    preview.appendChild(
        image
    );

    wrapper.appendChild(
        preview
    );


    return wrapper;
}
    
    // =========================
    // VECCHIO SISTEMA DI RISERVA
    // =========================

    if (item.product !== "tshirt") {

        const preview =
            document.createElement("div");

        preview.className =
            `cart-side-preview ${item.product}`;

        createPreviewContent(
            preview,
            isDoubleSidedProduct(item.product) &&
                item.customization &&
                item.customization.front
                ? item.customization.front
                : item.customization
        );

        wrapper.appendChild(preview);

        return wrapper;
    }


    const frontBlock =
        createTshirtSidePreview(
            item,
            "front",
            "Fronte"
        );

    const backBlock =
        createTshirtSidePreview(
            item,
            "back",
            "Retro"
        );


    wrapper.appendChild(frontBlock);
    wrapper.appendChild(backBlock);

    return wrapper;
}

function renderCart() {

    cartItemsContainer.innerHTML = "";

    if (cartItems.length === 0) {

    emptyCartMessage.style.display = "block";

    updateCartTotal();

    return;
}

    emptyCartMessage.style.display = "none";


    cartItems.forEach(function (item) {

        const product =
            products[item.product];

        const unitPrice =
            item.unitPrice ?? product.price;

        const itemTotal =
            unitPrice * item.quantity;


        const cartItemElement =
            document.createElement("div");

        cartItemElement.className =
            "cart-item";


        let details = "";


        if (item.product === "tshirt") {

    const color =
        item.tshirtColor === "black"
            ? "Nera"
            : "Bianca";


    const frontFormat =
        formatTshirtPrintCm(item.printFormat.front, normalizeTshirtFit(item.tshirtFit), normalizeTshirtFabric(item.tshirtFabric));


    const backFormat =
        formatTshirtPrintCm(item.printFormat.back, normalizeTshirtFit(item.tshirtFit), normalizeTshirtFabric(item.tshirtFabric));


    /* I vecchi articoli nel carrello non hanno tessuto/modello:
       erano T-Shirt 100% cotone adulto */
    const fabricLabel =
        TSHIRT_FABRICS[normalizeTshirtFabric(item.tshirtFabric)].label;

    const fitLabel =
        TSHIRT_FITS[normalizeTshirtFit(item.tshirtFit)].label;

    details =
    `${fabricLabel} · ${fitLabel}` +
    `<br>Colore: ${color}` +
    `<br>Taglia: ${item.tshirtSize || "Non specificata"}` +
    `<br>Stampa: ${describeTshirtCartPrint(item)}` +
    `<br>Fronte: ${frontFormat}` +
    `<br>Retro: ${backFormat}`;
} else if (product && product.dimensions) {

    /* Altri prodotti: mostriamo misura/formato per distinguerli
       (es. cuscino a cuore piccolo o grande) */
    details = product.dimensions;

    if (item.orientation) {
        details +=
            "<br>Orientamento: " +
            (item.orientation === "vertical"
                ? "verticale"
                : "orizzontale");
    }

    /* Cuscini quadrati: colore del retro */
    if (
        hasCushionBack(item.product) &&
        CUSHION_BACK_COLORS[item.cushionBackColor]
    ) {
        const back = CUSHION_BACK_COLORS[item.cushionBackColor];

        details +=
            '<br>Retro: <span class="cart-color-dot" style="background-color:' +
            back.hex +
            '" aria-hidden="true"></span>' +
            back.label;
    }

    /* Portachiavi: lati stampati */
    if (isDoubleSidedProduct(item.product)) {
        details +=
            "<br>Stampa: " +
            (hasPrintContent(getCartItemSideState(item, "back"))
                ? "fronte e retro"
                : "solo fronte");
    }
}


        cartItemElement.innerHTML = `

            <div class="cart-item-name">
                ${product.name}
            </div>

            <div class="cart-item-details">
                ${details}
            </div>

            <div class="cart-item-bottom">

                <div class="cart-quantity">

                    <button
                        type="button"
                        class="cart-quantity-button decrease"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        class="cart-quantity-button increase"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>


                <strong class="cart-item-price">
                    €${itemTotal
                        .toFixed(2)
                        .replace(".", ",")}
                </strong>


                <button
                    type="button"
                    class="remove-cart-item"
                    data-id="${item.id}"
                    title="Elimina"
                >
                    🗑
                </button>

            </div>
        `;


        const preview =
    createCartPreview(item);

cartItemElement.prepend(preview);

        cartItemsContainer.appendChild(
            cartItemElement
        );
    });


    updateCartTotal();
}

function updateCartTotal() {

    const total = cartItems.reduce(
        function (sum, item) {

            const unitPrice =
                item.unitPrice ??
                products[item.product].price;

            return (
                sum +
                unitPrice * item.quantity
            );
        },
        0
    );

    cartTotal.textContent =
        `€${total
            .toFixed(2)
            .replace(".", ",")}`;

    cartFooter.style.display =
        cartItems.length > 0
            ? "block"
            : "none";
}

function openCart() {

    renderCart();

    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
}


function closeCart() {

    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
}


cartButton.addEventListener("click", openCart);

closeCartButton.addEventListener(
    "click",
    closeCart
);

cartOverlay.addEventListener(
    "click",
    closeCart
);

function updateCartCount() {

    const totalQuantity = cartItems.reduce(
        function (total, item) {
            return total + item.quantity;
        },
        0
    );

    cartCount.textContent = totalQuantity;
}


addToCartButton.addEventListener("click", async function () {

    if (typeof getCurrentUnitPrice() !== "number") {
        statusMessage.textContent =
            "Questo prodotto sarà presto acquistabile: il prezzo non è ancora disponibile.";
        return;
    }

    const quantity = Math.max(
        1,
        Number(quantityInput.value) || 1
    );

    const state =
    getCurrentState();


/*
    Salviamo prima l'ultima
    trasformazione della foto attiva.
*/
syncSelectedImageFromLegacyState();
syncSelectedTextFromLegacyState();

/*
    Fronte e retro devono essere alla scala dell'area
    stampabile attuale, la stessa salvata in printAreaPx.
*/
if (rebaseVisibleStatesToLayout()) {
    renderCurrentState();
}


let cartPreviews = null;


if (currentProduct === "tshirt") {

    cartPreviews =
        await captureTshirtPreviews();


} else if (isDoubleSidedProduct(currentProduct)) {

    cartPreviews =
        await captureKeychainPreviews();

} else {

    cartPreviews =
        await captureCurrentProductPreview();
}

    const cartItem = {

    id: Date.now(),

    product: currentProduct,

    unitPrice:
        getCurrentUnitPrice(),

    quantity: quantity,
    
    previews: cartPreviews,


    tshirtColor:
        currentProduct === "tshirt"
            ? tshirtColor
            : null,

            tshirtSize:
    currentProduct === "tshirt"
        ? tshirtSize
        : null,

    tshirtFabric:
        currentProduct === "tshirt"
            ? tshirtFabric
            : null,

    tshirtFit:
        currentProduct === "tshirt"
            ? tshirtFit
            : null,

    cushionBackColor:
        hasCushionBack(currentProduct)
            ? cushionBackColor
            : null,


    orientation:
        getProductOrientation(currentProduct),

    printFormat:
        currentProduct === "tshirt"
            ? {
                front: tshirtPrintFormat.front,
                back: tshirtPrintFormat.back
            }
            : null,


    /*
        Misura dell'area vista dal cliente:
        serve per generare i file di stampa.
    */
    printAreaPx:
        getPrintAreaPxForCart(),


    customization:
    isDoubleSidedProduct(currentProduct)
        ? {
            front:
                createCartStateCopy(
                    productStates[currentProduct].front
                ),

            back:
                createCartStateCopy(
                    productStates[currentProduct].back
                )
        }
        : currentProduct === "tshirt"
        ? {
            front:
                createCartStateCopy(
                    productStates
                        .tshirt[tshirtColor]
                        .front
                ),

            back:
                createCartStateCopy(
                    productStates
                        .tshirt[tshirtColor]
                        .back
                )
        }
        :
            createCartStateCopy(
                state
            )
};

    const existingItem = cartItems.find(
    function (item) {

        return (
            item.product === cartItem.product &&

            item.tshirtColor ===
    cartItem.tshirtColor &&

item.tshirtSize ===
    cartItem.tshirtSize &&

(item.tshirtFabric || null) ===
    (cartItem.tshirtFabric || null) &&

(item.tshirtFit || null) ===
    (cartItem.tshirtFit || null) &&

(item.cushionBackColor || null) ===
    (cartItem.cushionBackColor || null) &&

JSON.stringify(item.printFormat) ===
                JSON.stringify(cartItem.printFormat) &&

            (item.orientation || null) ===
                (cartItem.orientation || null) &&

            JSON.stringify(item.customization) ===
                JSON.stringify(cartItem.customization)
        );
    }
);


if (existingItem) {

    existingItem.quantity += quantity;

} else {

    cartItems.push(cartItem);
}


configuratorStorage.setItem(
    "mycustomCart",
    JSON.stringify(cartItems)
);

updateCartCount();

statusMessage.textContent =
    `${products[currentProduct].name} aggiunto al carrello.`;
});


/*
    ============================
    CHECKOUT WOOCOMMERCE
    ============================

    Quando il configuratore è servito dal plugin
    WordPress (window.SUBLIMAMI_CONFIG), "Vai al
    checkout" genera i file di stampa di ogni
    articolo, li carica nel carrello WooCommerce
    e porta il cliente al pagamento.
*/

const checkoutButton =
    document.getElementById("checkoutButton");

const checkoutButtonLabel =
    checkoutButton.textContent.trim();

let checkoutInProgress = false;


function getShopConfig() {

    const config =
        window.SUBLIMAMI_CONFIG;

    return config && config.restUrl
        ? config
        : null;
}


function showCheckoutMessage(message) {

    let messageElement =
        document.getElementById("checkoutMessage");

    if (!messageElement) {

        messageElement =
            document.createElement("p");

        messageElement.id =
            "checkoutMessage";

        messageElement.className =
            "checkout-message";

        messageElement.setAttribute(
            "role",
            "alert"
        );

        cartFooter.appendChild(messageElement);
    }

    messageElement.textContent =
        message || "";

    messageElement.hidden =
        !message;
}


async function dataUrlToBlob(dataUrl) {

    const response =
        await fetch(dataUrl);

    return response.blob();
}


async function sendShopRequest(config, path, formData) {

    const headers = {};

    if (config.nonce) {
        headers["X-WP-Nonce"] = config.nonce;
    }

    let response;

    try {

        response = await fetch(
            config.restUrl + path,
            {
                method: "POST",
                body: formData,
                credentials: "same-origin",
                headers: headers
            }
        );

    } catch (error) {

        throw new Error(
            "Connessione non riuscita. Controlla la rete e riprova."
        );
    }


    let data = null;

    try {
        data = await response.json();
    } catch (error) {
        data = null;
    }


    if (!response.ok) {

        if (response.status === 413) {
            throw new Error(
                "I file sono troppo grandi per il server. Riduci il numero di foto e riprova."
            );
        }

        throw new Error(
            (data && data.message) ||
            "Il negozio non ha accettato l'ordine. Riprova tra poco."
        );
    }

    return data;
}


/* T-shirt nel carrello: lati con foto (servono per i supplementi) */
function getCartItemPhotoSides(item) {

    if (item.product !== "tshirt") {
        return [];
    }

    return ["front", "back"].filter(function (side) {
        const state = getCartItemSideState(item, side);
        return hasPrintContent(state) && hasImageContent(state);
    });
}

function describeTshirtCartPrint(item) {

    const info = getTshirtPrintInfo(
        getCartItemSideState(item, "front"),
        getCartItemSideState(item, "back")
    );

    const sides =
        info.front.printed && info.back.printed
            ? "fronte e retro"
            : info.back.printed
            ? "solo retro"
            : "solo fronte";

    return sides +
        (info.front.photos || info.back.photos ? ", con foto" : ", solo scritte");
}


async function createCartItemFormData(item) {

    const formData =
        new FormData();

    formData.append(
        "item",
        JSON.stringify({
            product: item.product,
            quantity: item.quantity,
            tshirtColor: item.tshirtColor,
            tshirtSize: item.tshirtSize,
            tshirtFabric: item.tshirtFabric,
            tshirtFit: item.tshirtFit,
            cushionBackColor: item.cushionBackColor,
            photoSides: getCartItemPhotoSides(item),
            orientation: item.orientation,
            printFormat: item.printFormat
        })
    );


    const printFiles =
        await createPrintFiles(item);

    if (printFiles.length === 0) {
        throw new Error(
            `${products[item.product].name}: aggiungi almeno una foto o una scritta prima di ordinare.`
        );
    }

    printFiles.forEach(function (printFile) {

        formData.append(
            "print_" + printFile.side,
            printFile.blob,
            `stampa-${printFile.side}.png`
        );
    });


    /*
        Anteprime: { front, back } per la T-shirt,
        una sola immagine per gli altri prodotti.
    */
    const previews =
        typeof item.previews === "string"
            ? { front: item.previews }
            : (item.previews || {});

    for (const side of ["front", "back"]) {

        if (
            typeof previews[side] === "string" &&
            previews[side].startsWith("data:image/")
        ) {

            formData.append(
                "preview_" + side,
                await dataUrlToBlob(previews[side]),
                `anteprima-${side}.jpg`
            );
        }
    }

    return formData;
}


async function startShopCheckout() {

    if (checkoutInProgress) {
        return;
    }

    showCheckoutMessage("");


    if (cartItems.length === 0) {

        showCheckoutMessage(
            "Il carrello è vuoto."
        );

        return;
    }


    const config =
        getShopConfig();

    if (!config) {

        showCheckoutMessage(
            "Il pagamento sarà disponibile sul sito del negozio."
        );

        return;
    }


    checkoutInProgress = true;
    checkoutButton.disabled = true;

    try {

        await sendShopRequest(
            config,
            "cart/reset",
            new FormData()
        );


        for (let index = 0; index < cartItems.length; index++) {

            checkoutButton.textContent =
                `Preparazione file di stampa ${index + 1}/${cartItems.length}…`;

            const formData =
                await createCartItemFormData(
                    cartItems[index]
                );

            checkoutButton.textContent =
                `Invio al negozio ${index + 1}/${cartItems.length}…`;

            await sendShopRequest(
                config,
                "cart/items",
                formData
            );
        }


        checkoutButton.textContent =
            "Apertura pagamento…";

        window.location.href =
            config.checkoutUrl;

    } catch (error) {

        console.error(
            "Checkout non riuscito:",
            error
        );

        showCheckoutMessage(
            error.message ||
            "Si è verificato un errore. Riprova."
        );

        checkoutButton.textContent =
            checkoutButtonLabel;

        checkoutButton.disabled = false;
        checkoutInProgress = false;
    }
}


checkoutButton.addEventListener(
    "click",
    startShopCheckout
);


/*
    Se il cliente torna indietro dal pagamento,
    il browser può mostrare la pagina com'era:
    riattiviamo il pulsante.
*/
window.addEventListener(
    "pageshow",
    function (event) {

        if (!event.persisted) {
            return;
        }

        checkoutButton.textContent =
            checkoutButtonLabel;

        checkoutButton.disabled = false;
        checkoutInProgress = false;
    }
);


/*
    ============================
    LINK DEL NEGOZIO
    ============================

    Dati del venditore, link legali e "Home"
    arrivano dal plugin WordPress. Senza plugin
    i link legali restano nascosti.
    I link prodotto del menu cambiano prodotto.
*/
function applyShopLinks() {

    const config =
        window.SUBLIMAMI_CONFIG || {};

    const legalUrls = {
        terms: config.termsUrl,
        privacy: config.privacyUrl
    };


    document
        .querySelectorAll("[data-legal-link]")
        .forEach(function (link) {

            const url =
                legalUrls[link.dataset.legalLink];

            if (url) {
                link.href = url;
                link.hidden = false;
            }
        });


    if (config.seller) {

        document
            .querySelectorAll("[data-seller-info]")
            .forEach(function (element) {
                element.textContent = config.seller;
            });
    }


    const homeLink =
        document.querySelector(
            '.site-header nav a[data-nav="home"]'
        );

    if (homeLink && config.homeUrl) {
        homeLink.href = config.homeUrl;
    }
}

applyShopLinks();

/*
    ============================
    RIPRISTINO INTERFACCIA
    ============================
*/

if (savedConfigurator) {

    productSelect.value =
        currentProduct;
}


/*
    Forziamo la sincronizzazione iniziale
    tra il menu prodotto e il configuratore.
*/
currentProduct =
    productSelect.value;


/*
    Costruiamo l'interfaccia corretta
    solo dopo aver recuperato il salvataggio.
*/
updateProductPreview();
updatePreviewZoom();
updateCartCount();

/* =========================================
   ANTEPRIMA COMPATTA SU MOBILE
   ========================================= */

let mobilePreviewWasCompact = false;
let mobilePreviewPreviousZoom = 100;

function updateMobileStickyPreview() {

    // Sulla T-shirt mobile lo zoom è controllato esclusivamente dai pulsanti.
    if (window.innerWidth <= 600 && currentProduct === "tshirt") {
        previewPanel.classList.remove("mobile-compact");
        mobilePreviewWasCompact = false;
        return;
    }

    /* Desktop: nessuna modalità compatta */
    if (window.innerWidth > 600) {

        if (mobilePreviewWasCompact) {
            previewZoom = mobilePreviewPreviousZoom;
            updatePreviewZoom();
        }

        previewPanel.classList.remove("mobile-compact");
        mobilePreviewWasCompact = false;

        return;
    }

    const rect = previewPanel.getBoundingClientRect();
    const shouldBeCompact =
        rect.top <= 0 && window.scrollY > 0;

    /* Entra nella modalità compatta */
    if (shouldBeCompact && !mobilePreviewWasCompact) {

        mobilePreviewPreviousZoom = previewZoom;

        previewPanel.classList.add("mobile-compact");

        previewZoom = 60;
        updatePreviewZoom();

        mobilePreviewWasCompact = true;
    }

    /* Esce dalla modalità compatta */
    else if (!shouldBeCompact && mobilePreviewWasCompact) {

        previewPanel.classList.remove("mobile-compact");

        previewZoom = mobilePreviewPreviousZoom;
        updatePreviewZoom();

        mobilePreviewWasCompact = false;
    }
}

window.addEventListener("scroll", updateMobileStickyPreview);
window.addEventListener("resize", updateMobileStickyPreview);

/* =========================================
   CONTROLLI EDITOR MOBILE
   ========================================= */

const mobileUndoButton =
    document.getElementById("mobileUndoButton");

const mobileRedoButton =
    document.getElementById("mobileRedoButton");

const mobileUploadButton =
    document.getElementById("mobileUploadButton");

    const mobileTextButton =
    document.getElementById(
        "mobileTextButton"
    );


/* ANNULLA */
mobileUndoButton.addEventListener(
    "click",
    function () {

        undoHistory();
    }
);


/* RIPRISTINA */
mobileRedoButton.addEventListener(
    "click",
    function () {

        redoHistory();
    }
);


/* CARICA FOTO */
mobileUploadButton.addEventListener(
    "click",
    function () {

        imageUpload.click();
    }
);

/* =========================================
   MOBILE - APRI EDITOR TESTO
   ========================================= */

const mobileTextEditorSheet =
    document.getElementById(
        "mobileTextEditorSheet"
    );

const mobileTextOverlay =
    document.getElementById(
        "mobileTextOverlay"
    );

const mobileTextEditorClose =
    document.getElementById(
        "mobileTextEditorClose"
    );

const mobileTextDoneButton =
    document.getElementById(
        "mobileTextDoneButton"
    );

const mobileTextInput =
    document.getElementById(
        "mobileTextInput"
    );


/* =========================================
   MOBILE - SINCRONIZZA TESTO
   ========================================= */

mobileTextInput.addEventListener(
    "input",
    function () {

        textInput.value =
            mobileTextInput.value;

        textInput.dispatchEvent(
            new Event(
                "input",
                {
                    bubbles: true
                }
            )
        );
    }
);

    function openMobileTextEditor() {

    /*
       Crea il testo usando la logica
       originale del configuratore.
    */

    addTextButton.click();

    mobileTextInput.value =
    textInput.value;


    /*
       Chiude Aggiungi design.
    */

    mobileDesignTools.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "mobile-design-open"
    );


    /*
       Apre l'editor testo mobile.
    */

    mobileTextEditorSheet.classList.add(
        "open"
    );

    mobileTextOverlay.classList.add(
        "open"
    );


    /*
       Porta subito il cursore
       nel campo di testo.
    */

    setTimeout(
        function () {
            mobileTextInput.focus();
        },
        250
    );
}


function closeMobileTextEditor() {

    mobileTextEditorSheet.classList.remove(
        "open"
    );

    mobileTextOverlay.classList.remove(
        "open"
    );
}


mobileTextButton.addEventListener(
    "click",
    openMobileTextEditor
);


mobileTextEditorClose.addEventListener(
    "click",
    closeMobileTextEditor
);


mobileTextDoneButton.addEventListener(
    "click",
    closeMobileTextEditor
);

mobileTextEditorSheet.addEventListener(
    "pointerdown",
    function (event) {

        event.stopPropagation();
    }
);


mobileTextEditorSheet.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();
    }
);

/* =========================================
   APERTURA MENU AGGIUNGI DESIGN
   ========================================= */

const mobileAddDesignButton =
    document.getElementById(
        "mobileAddDesignButton"
    );

const mobileDesignTools =
    document.getElementById(
        "mobileDesignTools"
    );


mobileAddDesignButton.addEventListener(
    "click",
    function () {

        mobileDesignTools.classList.toggle(
            "open"
        );

        const menuIsOpen =
            mobileDesignTools.classList.contains(
                "open"
            );

        document.body.classList.toggle(
            "mobile-design-open",
            menuIsOpen
        );

        updateMobileCustomizingState();
    }
);

/* =========================================
   HEADER MOBILE - CARRELLO
   ========================================= */

const mobileCartButton =
    document.getElementById("mobileCartButton");

const mobileCartCount =
    document.getElementById("mobileCartCount");


mobileCartButton.addEventListener(
    "click",
    function () {

        cartButton.click();

        document.body.classList.add(
            "mobile-cart-open"
        );
    }
);


/* Sincronizza automaticamente il numerino
   mobile con quello del carrello desktop */
const mobileCartObserver =
    new MutationObserver(function () {

        mobileCartCount.textContent =
            cartCount.textContent;
    });


mobileCartObserver.observe(
    cartCount,
    {
        childList: true,
        subtree: true,
        characterData: true
    }
);


/* Valore iniziale */
mobileCartCount.textContent =
    cartCount.textContent;

    /* =========================================
   HEADER MOBILE - MENU
   ========================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileNavigationMenu =
    document.getElementById(
        "mobileNavigationMenu"
    );


mobileMenuButton.addEventListener(
    "click",
    function () {

        mobileNavigationMenu.classList.toggle(
            "open"
        );
    }
);


document
    .querySelectorAll(
        "[data-mobile-product]"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const product =
                    button.dataset.mobileProduct;

                /*
                   Utilizziamo il selettore
                   prodotto originale.
                */
                productSelect.value =
                    product;

                productSelect.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );


                mobileNavigationMenu
                    .classList.remove(
                        "open"
                    );
            }
        );
    });

    /* =========================================
   MOBILE - AGGIUNGI AL CARRELLO
   ========================================= */

const mobileAddToCartButton =
    document.getElementById(
        "mobileAddToCartButton"
    );


mobileAddToCartButton.addEventListener(
    "click",
    function () {

        addToCartButton.click();
    }
);

closeCartButton.addEventListener(
    "click",
    function () {

        document.body.classList.remove(
            "mobile-cart-open"
        );
    }
);


cartOverlay.addEventListener(
    "click",
    function () {

        document.body.classList.remove(
            "mobile-cart-open"
        );
    }
);

/* =========================================
   MOBILE - SELEZIONE PRODOTTI
   ========================================= */

const mobileProductsButton =
    document.getElementById(
        "mobileProductsButton"
    );

const mobileProductsSheet =
    document.getElementById(
        "mobileProductsSheet"
    );

const mobileProductsOverlay =
    document.getElementById(
        "mobileProductsOverlay"
    );

const mobileProductsClose =
    document.getElementById(
        "mobileProductsClose"
    );


/* Su mobile la scheda Prodotti ha due passi:
   1) categorie  2) tipi della categoria scelta */
const mobileProductsBack =
    document.getElementById("mobileProductsBack");

const mobileProductsTitle =
    document.getElementById("mobileProductsTitle");

const mobileProductsSubtitle =
    document.getElementById("mobileProductsSubtitle");

const mobileProductOptions =
    document.getElementById("mobileProductOptions");


function showMobileCategories() {

    mobileProductsSheet.classList.remove("showing-products");

    mobileProductsTitle.textContent = "Prodotti";
    mobileProductsSubtitle.textContent = "Scegli la categoria";
}


function showMobileCategoryProducts(categoryKey) {

    const category = productCategories.find(function (item) {
        return item.key === categoryKey;
    });

    mobileProductsSheet
        .querySelectorAll("[data-mobile-category]")
        .forEach(function (button) {
            button.hidden =
                button.dataset.mobileCategory !== categoryKey;

            button.classList.toggle(
                "active",
                button.dataset.mobileProductChoice === currentProduct
            );
        });

    mobileProductsSheet.classList.add("showing-products");

    mobileProductsTitle.textContent =
        category ? category.label : "Prodotti";

    mobileProductsSubtitle.textContent =
        (category && category.variantLabel) || "Scegli il tipo";

    if (mobileProductOptions) {
        mobileProductOptions.scrollTop = 0;
    }
}


function openMobileProducts() {

    showMobileCategories();

    mobileProductsSheet.classList.add(
        "open"
    );

    mobileProductsOverlay.classList.add(
        "open"
    );
}


function closeMobileProducts() {

    mobileProductsSheet.classList.remove(
        "open"
    );

    mobileProductsOverlay.classList.remove(
        "open"
    );
}


mobileProductsButton.addEventListener(
    "click",
    openMobileProducts
);


mobileProductsClose.addEventListener(
    "click",
    closeMobileProducts
);


mobileProductsOverlay.addEventListener(
    "click",
    closeMobileProducts
);


mobileProductsBack.addEventListener(
    "click",
    showMobileCategories
);


/* Passa da un pannello mobile all'altro */
function openMobileSheet(sheet, overlay) {
    sheet.classList.add("open");
    overlay.classList.add("open");
}

function closeMobileSheet(sheet, overlay) {
    sheet.classList.remove("open");
    overlay.classList.remove("open");
}


const mobileTshirtSheet =
    document.getElementById(
        "mobileTshirtSheet"
    );

const mobileTshirtOverlay =
    document.getElementById(
        "mobileTshirtOverlay"
    );

const mobileTshirtClose =
    document.getElementById(
        "mobileTshirtClose"
    );

const mobileTshirtBack =
    document.getElementById(
        "mobileTshirtBack"
    );

const mobileTshirtFitSheet =
    document.getElementById("mobileTshirtFitSheet");

const mobileTshirtFitOverlay =
    document.getElementById("mobileTshirtFitOverlay");

const mobileTshirtSizeSheet =
    document.getElementById("mobileTshirtSizeSheet");

const mobileTshirtSizeOverlay =
    document.getElementById("mobileTshirtSizeOverlay");


/* Scelte fatte nei passi della T-Shirt su mobile:
   vengono applicate tutte insieme alla fine */
const mobileTshirtDraft = {
    fabric: "cotton",
    fit: "adult",
    color: "white"
};

/* Da dove si è aperta la scelta taglia: "flow" o "more" */
let mobileSizeOpenedFrom = "flow";


function openMobileTshirtModels() {

    closeMobileProducts();

    /* Prezzo "da" sulle schede dei tessuti */
    document
        .querySelectorAll("[data-tshirt-price-from]")
        .forEach(function (element) {

            const price =
                getTshirtPriceFrom(element.dataset.tshirtPriceFrom);

            element.textContent =
                typeof price === "number"
                    ? "da " + formatProductPrice(price)
                    : "Prezzo da definire";
        });

    openMobileSheet(mobileTshirtSheet, mobileTshirtOverlay);
}


function closeMobileTshirtModels() {
    closeMobileSheet(mobileTshirtSheet, mobileTshirtOverlay);
}


document
    .querySelectorAll(
        "[data-mobile-category-open]"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const categoryKey =
                    button.dataset.mobileCategoryOpen;

                /* T-Shirt: tessuto → modello → colore → taglia */
                if (categoryKey === "tshirt") {
                    openMobileTshirtModels();
                    return;
                }

                const productsInCategory =
                    getCategoryProducts(categoryKey);

                /* Un solo tipo (es. tappetino): si entra subito */
                if (productsInCategory.length === 1) {

                    productSelect.value = productsInCategory[0];

                    productSelect.dispatchEvent(
                        new Event("change", { bubbles: true })
                    );

                    closeMobileProducts();
                    return;
                }

                showMobileCategoryProducts(categoryKey);
            }
        );
    });


document
    .querySelectorAll(
        "[data-mobile-product-choice]"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const product =
                    button.dataset
                        .mobileProductChoice;

                productSelect.value =
                    product;


                productSelect.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );


                closeMobileProducts();
            }
        );
    });


mobileTshirtBack.addEventListener(
    "click",
    function () {

        closeMobileTshirtModels();

        openMobileProducts();
    }
);


mobileTshirtClose.addEventListener(
    "click",
    closeMobileTshirtModels
);


mobileTshirtOverlay.addEventListener(
    "click",
    closeMobileTshirtModels
);


/* PASSO TESSUTO → apre Adulto / Bambino */
document
    .querySelectorAll("[data-mobile-tshirt-fabric]")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            mobileTshirtDraft.fabric =
                normalizeTshirtFabric(button.dataset.mobileTshirtFabric);

            const fits =
                TSHIRT_FABRICS[mobileTshirtDraft.fabric].fits;

            /* Cotone: solo adulto, si passa subito al colore */
            if (fits.length === 1) {
                mobileTshirtDraft.fit = fits[0];
                closeMobileTshirtModels();
                continueMobileTshirtAfterFit();
                return;
            }

            document.getElementById("mobileTshirtFitSubtitle").textContent =
                "T-Shirt " + TSHIRT_FABRICS[mobileTshirtDraft.fabric].label;

            const kidsSizes =
                getTshirtSizeInfo(mobileTshirtDraft.fabric, "kids").sizes;

            document.getElementById("mobileKidsSizesText").textContent =
                "Taglie da " +
                kidsSizes[0].replace(" anni", "") +
                " a " +
                kidsSizes[kidsSizes.length - 1];

            closeMobileTshirtModels();
            openMobileSheet(mobileTshirtFitSheet, mobileTshirtFitOverlay);
        });
    });


document
    .getElementById("mobileTshirtFitBack")
    .addEventListener("click", function () {
        closeMobileSheet(mobileTshirtFitSheet, mobileTshirtFitOverlay);
        openMobileTshirtModels();
    });

document
    .getElementById("mobileTshirtFitClose")
    .addEventListener("click", function () {
        closeMobileSheet(mobileTshirtFitSheet, mobileTshirtFitOverlay);
    });

mobileTshirtFitOverlay.addEventListener("click", function () {
    closeMobileSheet(mobileTshirtFitSheet, mobileTshirtFitOverlay);
});


/* PASSO ADULTO / BAMBINO → colore (solo cotone) oppure taglia */
document
    .querySelectorAll("[data-mobile-tshirt-fit]")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            mobileTshirtDraft.fit =
                normalizeTshirtFit(button.dataset.mobileTshirtFit);

            closeMobileSheet(mobileTshirtFitSheet, mobileTshirtFitOverlay);

            continueMobileTshirtAfterFit();
        });
    });

/* Dopo il modello: colore (solo cotone) oppure taglia */
function continueMobileTshirtAfterFit() {

    if (TSHIRT_FABRICS[mobileTshirtDraft.fabric].colors.length > 1) {
        openMobileTshirtColors();
        return;
    }

    /* Poliestere: solo bianca */
    mobileTshirtDraft.color = "white";
    applyMobileTshirtDraft();
    openMobileTshirtSizes("flow");
}


/* Entra nella T-Shirt con tessuto, modello e colore scelti */
function applyMobileTshirtDraft() {

    if (productSelect.value !== "tshirt") {

        productSelect.value = "tshirt";

        productSelect.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    }

    setTshirtVariant(mobileTshirtDraft.fabric, mobileTshirtDraft.fit, "fit");

    if (tshirtColor !== mobileTshirtDraft.color) {

        /* Utilizziamo i pulsanti colore originali del configuratore */
        const originalColorButton =
            document.querySelector(
                `.color-button[data-color="${mobileTshirtDraft.color}"]`
            );

        if (originalColorButton) {
            originalColorButton.click();
        }
    }
}


const mobileTshirtColorSheet =
    document.getElementById(
        "mobileTshirtColorSheet"
    );

const mobileTshirtColorOverlay =
    document.getElementById(
        "mobileTshirtColorOverlay"
    );

const mobileTshirtColorBack =
    document.getElementById(
        "mobileTshirtColorBack"
    );

const mobileTshirtColorClose =
    document.getElementById(
        "mobileTshirtColorClose"
    );


function openMobileTshirtColors() {

    closeMobileTshirtModels();

    document.getElementById("mobileTshirtColorSubtitle").textContent =
        getTshirtVariantLabel(mobileTshirtDraft.fabric, mobileTshirtDraft.fit);

    openMobileSheet(mobileTshirtColorSheet, mobileTshirtColorOverlay);
}


function closeMobileTshirtColors() {
    closeMobileSheet(mobileTshirtColorSheet, mobileTshirtColorOverlay);
}


mobileTshirtColorBack.addEventListener(
    "click",
    function () {

        closeMobileTshirtColors();

        /* Cotone: niente passo Adulto / Bambino, si torna ai tessuti */
        if (TSHIRT_FABRICS[mobileTshirtDraft.fabric].fits.length === 1) {
            openMobileTshirtModels();
            return;
        }

        openMobileSheet(mobileTshirtFitSheet, mobileTshirtFitOverlay);
    }
);


mobileTshirtColorClose.addEventListener(
    "click",
    closeMobileTshirtColors
);


mobileTshirtColorOverlay.addEventListener(
    "click",
    closeMobileTshirtColors
);

/* =========================================
   MOBILE - SELEZIONE COLORE T-SHIRT
   ========================================= */

document
    .querySelectorAll(
        "[data-tshirt-mobile-color]"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                mobileTshirtDraft.color =
                    button.dataset
                        .tshirtMobileColor;

                applyMobileTshirtDraft();

                /* Chiude la scelta colore e passa alla taglia */
                closeMobileTshirtColors();

                openMobileTshirtSizes("flow");
            }
        );
    });


/* =========================================
   MOBILE - SCELTA TAGLIA T-SHIRT
   ========================================= */

function openMobileTshirtSizes(openedFrom) {

    mobileSizeOpenedFrom = openedFrom || "flow";

    const container =
        document.getElementById("mobileTshirtSizeOptions");

    container.innerHTML = "";

    getTshirtSizeInfo(tshirtFabric, tshirtFit).sizes.forEach(function (size) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "mobile-size-option";
        button.textContent = size;
        button.dataset.mobileSize = size;

        if (size === tshirtSize) {
            button.classList.add("active");
        }

        button.addEventListener("click", function () {

            /* Usiamo i pulsanti taglia originali del configuratore */
            const originalSizeButton =
                document.querySelector(
                    `.size-button[data-size="${size}"]`
                );

            if (originalSizeButton) {
                originalSizeButton.click();
            }

            closeMobileSheet(mobileTshirtSizeSheet, mobileTshirtSizeOverlay);
        });

        container.appendChild(button);
    });

    document.getElementById("mobileTshirtSizeSubtitle").textContent =
        getTshirtVariantLabel(tshirtFabric, tshirtFit);

    openMobileSheet(mobileTshirtSizeSheet, mobileTshirtSizeOverlay);
}


document
    .getElementById("mobileTshirtSizeBack")
    .addEventListener("click", function () {

        closeMobileSheet(mobileTshirtSizeSheet, mobileTshirtSizeOverlay);

        if (mobileSizeOpenedFrom === "more") {
            openMobileSheet(mobileMoreSheet, mobileMoreOverlay);
            return;
        }

        if (TSHIRT_FABRICS[tshirtFabric].colors.length > 1) {
            openMobileTshirtColors();
        } else {
            openMobileSheet(mobileTshirtFitSheet, mobileTshirtFitOverlay);
        }
    });

document
    .getElementById("mobileTshirtSizeClose")
    .addEventListener("click", function () {
        closeMobileSheet(mobileTshirtSizeSheet, mobileTshirtSizeOverlay);
    });

mobileTshirtSizeOverlay.addEventListener("click", function () {
    closeMobileSheet(mobileTshirtSizeSheet, mobileTshirtSizeOverlay);
});

    /* =========================================
   MOBILE - ALTRE AZIONI
   ========================================= */

const mobileMoreSheet =
    document.getElementById(
        "mobileMoreSheet"
    );

const mobileMoreOverlay =
    document.getElementById(
        "mobileMoreOverlay"
    );

const mobileMoreClose =
    document.getElementById(
        "mobileMoreClose"
    );


function updateMobileMoreActions() {

    const tshirtActions =
        document.querySelectorAll(
            ".tshirt-only-action"
        );


    tshirtActions.forEach(
        function (action) {

            action.style.display =
                currentProduct === "tshirt"
                    ? ""
                    : "none";
        }
    );
}


function openMobileMore() {

    updateMobileMoreActions();

    mobileMoreSheet.classList.add(
        "open"
    );

    mobileMoreOverlay.classList.add(
        "open"
    );
}


function closeMobileMore() {

    mobileMoreSheet.classList.remove(
        "open"
    );

    mobileMoreOverlay.classList.remove(
        "open"
    );
}


mobileMoreButton.addEventListener(
    "click",
    openMobileMore
);


mobileMoreClose.addEventListener(
    "click",
    closeMobileMore
);


mobileMoreOverlay.addEventListener(
    "click",
    closeMobileMore
);

/* Altre azioni → Taglia (solo T-Shirt) */
document.getElementById("mobileTshirtSizeAction").addEventListener("click", function () {
    closeMobileMore();
    openMobileTshirtSizes("more");
});

document.getElementById("mobileResetAction").addEventListener("click", function () {
    resetButton.click();
    closeMobileMore();
});

/* =========================================
   MOBILE - FRONTE / RETRO
   ========================================= */

const mobileSideAction =
    document.getElementById(
        "mobileSideAction"
    );

const mobileSideSheet =
    document.getElementById(
        "mobileSideSheet"
    );

const mobileSideOverlay =
    document.getElementById(
        "mobileSideOverlay"
    );

const mobileSideBack =
    document.getElementById(
        "mobileSideBack"
    );

const mobileSideClose =
    document.getElementById(
        "mobileSideClose"
    );

const mobileFrontPreview =
    document.getElementById(
        "mobileFrontPreview"
    );

const mobileBackPreview =
    document.getElementById(
        "mobileBackPreview"
    );


function updateMobileSideSheet() {

    const mobileSideCards =
        document.querySelectorAll(
            "[data-mobile-side]"
        );


    mobileSideCards.forEach(
        function (card) {

            card.classList.toggle(
                "active",
                card.dataset.mobileSide ===
                    tshirtSide
            );
        }
    );


    /*
       Mostra nel pannello il colore
       T-Shirt attualmente selezionato.
    */

    mobileFrontPreview.src =
        getTshirtMockupPath("front", tshirtColor, tshirtFabric);


    mobileBackPreview.src =
        getTshirtMockupPath("back", tshirtColor, tshirtFabric);
}


function openMobileSideSheet() {

    closeMobileMore();

    updateMobileSideSheet();

    mobileSideSheet.classList.add(
        "open"
    );

    mobileSideOverlay.classList.add(
        "open"
    );
}


function closeMobileSideSheet() {

    mobileSideSheet.classList.remove(
        "open"
    );

    mobileSideOverlay.classList.remove(
        "open"
    );
}


if (mobileSideAction) {

    mobileSideAction.addEventListener(
        "click",
        openMobileSideSheet
    );
}


mobileSideBack.addEventListener(
    "click",
    function () {

        closeMobileSideSheet();

        openMobileMore();
    }
);


mobileSideClose.addEventListener(
    "click",
    closeMobileSideSheet
);


mobileSideOverlay.addEventListener(
    "click",
    closeMobileSideSheet
);


document
    .querySelectorAll(
        "[data-mobile-side]"
    )
    .forEach(function (mobileButton) {

        mobileButton.addEventListener(
            "click",
            function () {

                const selectedSide =
                    mobileButton.dataset
                        .mobileSide;


                const originalSideButton =
                    document.querySelector(
                        `.side-button[data-side="${selectedSide}"]`
                    );


                if (originalSideButton) {

                    originalSideButton.click();
                }


                updateMobileSideSheet();

                closeMobileSideSheet();
            }
        );
    });

    /* =========================================
   MOBILE - FORMATO STAMPA
   ========================================= */

const mobileFormatAction =
    document.getElementById(
        "mobileFormatAction"
    );

const mobileFormatSheet =
    document.getElementById(
        "mobileFormatSheet"
    );

const mobileFormatOverlay =
    document.getElementById(
        "mobileFormatOverlay"
    );

const mobileFormatBack =
    document.getElementById(
        "mobileFormatBack"
    );

const mobileFormatClose =
    document.getElementById(
        "mobileFormatClose"
    );


function updateMobileFormatSheet() {

    const mobileFormatCards =
        document.querySelectorAll(
            "[data-mobile-format]"
        );


    mobileFormatCards.forEach(
        function (card) {

            card.classList.toggle(
                "active",
                card.dataset.mobileFormat ===
                    tshirtPrintFormat
            );
        }
    );
}


function openMobileFormatSheet() {

    closeMobileMore();

    updateMobileFormatSheet();

    mobileFormatSheet.classList.add(
        "open"
    );

    mobileFormatOverlay.classList.add(
        "open"
    );
}


function closeMobileFormatSheet() {

    mobileFormatSheet.classList.remove(
        "open"
    );

    mobileFormatOverlay.classList.remove(
        "open"
    );
}


if (mobileFormatAction) {

    mobileFormatAction.addEventListener(
        "click",
        openMobileFormatSheet
    );
}


mobileFormatBack.addEventListener(
    "click",
    function () {

        closeMobileFormatSheet();

        openMobileMore();
    }
);


mobileFormatClose.addEventListener(
    "click",
    closeMobileFormatSheet
);


mobileFormatOverlay.addEventListener(
    "click",
    closeMobileFormatSheet
);


document
    .querySelectorAll(
        "[data-mobile-format]"
    )
    .forEach(function (mobileButton) {

        mobileButton.addEventListener(
            "click",
            function () {

                const selectedFormat =
                    mobileButton.dataset
                        .mobileFormat;


                const originalFormatButton =
                    document.querySelector(
                        `.print-format-button[data-format="${selectedFormat}"]`
                    );


                if (originalFormatButton) {

                    originalFormatButton.click();
                }


                updateMobileFormatSheet();

                closeMobileFormatSheet();
            }
        );
    });

    /* =========================================
   MOBILE - CONTROLLI RAPIDI T-SHIRT
   ========================================= */

const mobileTshirtQuickControls =
    document.getElementById(
        "mobileTshirtQuickControls"
    );


function updateMobileQuickControls() {

    /*
        Cerchiamo l'elemento qui dentro: la funzione viene
        chiamata anche da updateProductPreview, prima che
        la costante qui sopra sia inizializzata.
    */
    const quickControls =
        document.getElementById(
            "mobileTshirtQuickControls"
        );

    if (!quickControls) {
        return;
    }


    /* Mostra i controlli sulla T-Shirt; sui portachiavi solo Fronte/Retro */

    quickControls.classList.toggle(
        "visible",
        currentProduct === "tshirt" ||
            isDoubleSidedProduct(currentProduct)
    );

    quickControls.classList.toggle(
        "sides-only",
        currentProduct !== "tshirt" ||
            getTshirtFormats().length < 2
    );

    /* Fronte / Retro */

    document
        .querySelectorAll(
            "[data-mobile-quick-side]"
        )
        .forEach(function (button) {

            button.classList.toggle(
                "active",
                button.dataset.mobileQuickSide ===
                    getCurrentSide()
            );
        });


    /* Verticale / Orizzontale */

    document
        .querySelectorAll(
            "[data-mobile-quick-format]"
        )
        .forEach(function (button) {

            button.classList.toggle(
                "active",
                button.dataset.mobileQuickFormat ===
                    tshirtPrintFormat[tshirtSide]
            );
        });
}


/* FRONTE / RETRO */

document
    .querySelectorAll(
        "[data-mobile-quick-side]"
    )
    .forEach(function (mobileButton) {

        mobileButton.addEventListener(
            "click",
            function () {

                const selectedSide =
                    mobileButton.dataset
                        .mobileQuickSide;

                /* Portachiavi: lato del portachiavi */
                if (isDoubleSidedProduct(currentProduct)) {
                    setKeychainSide(selectedSide);
                    updateMobileQuickControls();
                    return;
                }


                const originalButton =
                    document.querySelector(
                        `.side-button[data-side="${selectedSide}"]`
                    );


                if (originalButton) {

                    originalButton.click();
                }


                updateMobileQuickControls();
            }
        );
    });


/* VERTICALE / ORIZZONTALE */

document
    .querySelectorAll(
        "[data-mobile-quick-format]"
    )
    .forEach(function (mobileButton) {

        mobileButton.addEventListener(
            "click",
            function () {

                const selectedFormat =
                    mobileButton.dataset
                        .mobileQuickFormat;


                const originalButton =
                    document.querySelector(
                        `.print-format-button[data-format="${selectedFormat}"]`
                    );


                if (originalButton) {

                    originalButton.click();
                }


                updateMobileQuickControls();
            }
        );
    });


/*
   Aggiorna i pulsanti anche quando
   cambia qualcosa dai controlli originali.
*/

document
    .querySelectorAll(
        ".side-button, .print-format-button"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                setTimeout(
                    updateMobileQuickControls,
                    0
                );
            }
        );
    });


/* Stato iniziale */

updateMobileQuickControls();


/* =========================================
   T-SHIRT - MINIATURE FRONTE E RETRO
   -----------------------------------------
   Due miniature nell'anteprima mostrano
   insieme i due lati; un clic passa a quel
   lato (stesso pulsante Fronte/Retro).
   Il disegno è quello delle anteprime del
   carrello (createTshirtCartCanvas).
   "var": queste variabili servono anche a
   renderCurrentState, che può essere
   chiamata prima di arrivare qui.
   ========================================= */

var tshirtThumbsTimer = null;

/* "var": la funzione qui sotto viene chiamata anche prima di questa riga */
var tshirtPriceTimer = null;
var tshirtThumbsRun = 0;


function scheduleTshirtSideThumbs() {

    /* Il prezzo della T-shirt cambia con foto e lati stampati.
       Subito dopo: il campo testo aggiorna lo stato dopo questo evento */
    clearTimeout(tshirtPriceTimer);
    tshirtPriceTimer = setTimeout(updateTshirtPriceDisplay, 0);

    clearTimeout(tshirtThumbsTimer);

    tshirtThumbsTimer =
        setTimeout(renderTshirtSideThumbs, 200);
}


/*
    Copia dello stato di un lato, alle misure
    desktop usate da createTshirtCartCanvas.
    Lo stato vero non viene modificato.
*/
function getTshirtThumbState(side) {

    const live =
        productStates.tshirt[tshirtColor][side];

    const copy =
        Object.assign({}, live, {
            images: (live.images || []).map(function (image) {
                return Object.assign({}, image);
            }),
            texts: (live.texts || []).map(function (text) {
                return Object.assign({}, text);
            })
        });

    if (window.innerWidth <= 600) {

        const format =
            tshirtPrintFormat[side];

        scaleStateLengths(
            copy,
            getTshirtPrintAreaPx(format, false).baseWidth /
                getTshirtPrintAreaPx(format, true).baseWidth
        );
    }

    return copy;
}


async function renderTshirtSideThumbs() {

    const box =
        document.getElementById("tshirtSideThumbs");

    if (!box) {
        return;
    }

    const visible =
        currentProduct === "tshirt";

    box.classList.toggle("visible", visible);

    if (!visible) {
        return;
    }

    box.querySelectorAll("[data-thumb-side]").forEach(function (button) {
        button.classList.toggle(
            "active",
            button.dataset.thumbSide === tshirtSide
        );
    });

    /* Ultima modifica alla foto o alla scritta selezionata */
    syncSelectedImageFromLegacyState();
    syncSelectedTextFromLegacyState();

    const run =
        ++tshirtThumbsRun;

    for (const side of ["front", "back"]) {

        const target =
            box.querySelector(`[data-thumb-side="${side}"] canvas`);

        let canvas;

        try {
            canvas = await createTshirtCartCanvas(side, {
                state: getTshirtThumbState(side)
            });
        } catch (error) {
            continue;
        }

        /* Nel frattempo è partito un disegno più recente */
        if (run !== tshirtThumbsRun) {
            return;
        }

        const context =
            target.getContext("2d");

        context.clearRect(0, 0, target.width, target.height);
        context.drawImage(canvas, 0, 0, target.width, target.height);
    }
}


document
    .querySelectorAll("[data-thumb-side]")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            const sideButton =
                document.querySelector(
                    `.side-button[data-side="${button.dataset.thumbSide}"]`
                );

            if (sideButton) {
                sideButton.click();
            }
        });
    });


/* =========================================
   FOTO DEL PRODOTTO VERO ("Dal vero")
   ========================================= */
function updateRealPhotoThumb() {

    const thumb =
        document.getElementById("realPhotoThumb");

    if (!thumb) {
        return;
    }

    const photo =
        getRealPhoto(currentProduct);

    thumb.classList.toggle("visible", Boolean(photo));

    if (!photo) {
        return;
    }

    const image =
        thumb.querySelector("img");

    if (image.getAttribute("src") !== photo.src) {
        image.src = photo.src;
    }

    /* "Dal vero", oppure "Retro" per i cuscini quadrati */
    thumb.querySelector("span").textContent =
        photo.label || "Dal vero";

    thumb.title =
        photo.label
            ? "Guarda il retro del cuscino"
            : "Guarda il prodotto dal vero";
}

(function () {

    const thumb = document.getElementById("realPhotoThumb");
    const dialog = document.getElementById("realPhotoDialog");

    if (!thumb || !dialog || typeof dialog.showModal !== "function") {
        return;
    }

    const largeImage = document.getElementById("realPhotoLarge");
    const caption = document.getElementById("realPhotoCaption");

    thumb.addEventListener("click", function () {

        const photo = getRealPhoto(currentProduct);

        if (!photo) {
            return;
        }

        largeImage.src = photo.src;
        largeImage.alt = photo.alt;
        caption.textContent = photo.caption;

        dialog.showModal();
    });

    document
        .getElementById("realPhotoClose")
        .addEventListener("click", function () {
            dialog.close();
        });

    /* Clic sullo sfondo scuro: chiude */
    dialog.addEventListener("click", function (event) {
        if (event.target === dialog) {
            dialog.close();
        }
    });
})();

updateRealPhotoThumb();


/* Fine di un trascinamento, testo scritto, colore, annulla... */
["pointerup", "input", "change", "keyup", "click"].forEach(function (type) {

    document.addEventListener(type, function () {

        if (currentProduct === "tshirt") {
            scheduleTshirtSideThumbs();
        }
    }, true);
});

scheduleTshirtSideThumbs();


/* =========================================
   MOBILE - MENU FORMATO TESTO
   ========================================= */

const mobileSelectedTextFormat =
    document.getElementById(
        "mobileSelectedTextFormat"
    );

const mobileTextFormatMenu =
    document.getElementById(
        "mobileTextFormatMenu"
    );

const mobileTextBoldOption =
    document.getElementById(
        "mobileTextBoldOption"
    );

const mobileTextItalicOption =
    document.getElementById(
        "mobileTextItalicOption"
    );


function updateMobileTextFormatMenu() {

    const state =
        getCurrentState();

    mobileTextBoldOption.classList.toggle(
        "active",
        state.textBold
    );

    mobileTextItalicOption.classList.toggle(
        "active",
        state.textItalic
    );
}


mobileSelectedTextFormat.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        updateMobileTextFormatMenu();

        toggleMobileTextMenu(mobileTextFormatMenu);
    }
);

document.addEventListener("click", function (event) {

    if (
        !mobileTextFormatMenu.classList.contains("open")
    ) {
        return;
    }

    if (
        mobileTextFormatMenu.contains(event.target) ||
        mobileSelectedTextFormat.contains(event.target)
    ) {
        return;
    }

    mobileTextFormatMenu.classList.remove("open");
    document.body.classList.remove("mobile-format-open");
});


mobileTextBoldOption.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        runMobileTextCommand(function () { boldButton.click(); });

        updateMobileTextFormatMenu();
    }
);


mobileTextItalicOption.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        runMobileTextCommand(function () { italicButton.click(); });

        updateMobileTextFormatMenu();
    }
);

/* =========================================
   MOBILE - PALETTE COLORE TESTO
   ========================================= */

const mobileSelectedTextColor =
    document.getElementById(
        "mobileSelectedTextColor"
    );

const mobileSelectionColor =
    document.querySelector(
        ".mobile-selection-color"
    );

const mobileTextColorMenu =
    document.getElementById(
        "mobileTextColorMenu"
    );

const mobileCustomColorButton =
    document.getElementById(
        "mobileCustomColorButton"
    );

const mobileColorSwatches =
    document.querySelectorAll(
        ".mobile-color-swatch"
    );


function updateMobileTextColor() {

    const state =
        getCurrentState();

    const currentColor =
        state.textColor.toLowerCase();

    mobileSelectionColor.style.backgroundColor =
        currentColor;

    mobileColorSwatches.forEach(
        function (button) {

            button.classList.toggle(
                "active",
                button.dataset.textColor.toLowerCase() ===
                    currentColor
            );
        }
    );
}


mobileSelectedTextColor.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        if (
            selectedElementType !== "text"
        ) {
            return;
        }

        updateMobileTextColor();
        toggleMobileTextMenu(mobileTextColorMenu);
    }
);


mobileColorSwatches.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const selectedColor =
                    button.dataset.textColor;

                if (!hasMobileSelectedText()) return;
                saveHistoryState();

                textColor.value =
                    selectedColor;

                textColor.dispatchEvent(
                    new Event(
                        "input",
                        { bubbles: true }
                    )
                );

                syncSelectedTextFromLegacyState();
                updateMobileTextColor();

                mobileTextColorMenu.classList.remove(
    "open"
);

document.body.classList.remove(
    "mobile-color-open"
);
            }
        );
    }
);


const mobileCustomColorMenu =
    document.getElementById(
        "mobileCustomColorMenu"
    );

const mobileCustomColorBack =
    document.getElementById(
        "mobileCustomColorBack"
    );

const mobileHueRange =
    document.getElementById(
        "mobileHueRange"
    );

    const mobileLightRange =
    document.getElementById(
        "mobileLightRange"
    );

const mobileHexColor =
    document.getElementById(
        "mobileHexColor"
    );

const mobileCustomColorPreview =
    document.getElementById(
        "mobileCustomColorPreview"
    );


function rgbToHex(r, g, b) {

    return "#" +
        [r, g, b]
            .map(function (value) {
                return value
                    .toString(16)
                    .padStart(2, "0");
            })
            .join("")
            .toUpperCase();
}


function hslToHex(
    hue,
    saturation,
    lightness
) {

    const s =
        saturation / 100;

    const l =
        lightness / 100;

    const c =
        (1 - Math.abs(2 * l - 1)) * s;

    const h =
        hue / 60;

    const x =
        c * (1 - Math.abs((h % 2) - 1));

    const m =
        l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h < 1) {
        r = c;
        g = x;
    } else if (h < 2) {
        r = x;
        g = c;
    } else if (h < 3) {
        g = c;
        b = x;
    } else if (h < 4) {
        g = x;
        b = c;
    } else if (h < 5) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    return rgbToHex(
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)
    );
}


function applyMobileCustomColor(color) {

    if (!hasMobileSelectedText()) return;

    textColor.value =
        color;

    textColor.dispatchEvent(
        new Event(
            "input",
            { bubbles: true }
        )
    );

    mobileHexColor.value =
        color.toUpperCase();

    mobileCustomColorPreview.style.backgroundColor =
        color;

    updateMobileTextColor();
    syncSelectedTextFromLegacyState();
}


mobileCustomColorButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        mobileTextColorMenu.classList.remove(
            "open"
        );

        mobileCustomColorMenu.classList.add(
            "open"
        );

        mobileHexColor.value =
            textColor.value.toUpperCase();

        mobileCustomColorPreview.style.backgroundColor =
            textColor.value;
    }
);


function updateColorFromMobileSliders() {

    const color =
        hslToHex(
            Number(mobileHueRange.value),
            100,
            Number(mobileLightRange.value)
        );

    applyMobileCustomColor(color);


    /* Il secondo slider mostra
       chiaro/scuro della tonalità scelta */

    const hueColor =
        hslToHex(
            Number(mobileHueRange.value),
            100,
            50
        );

    mobileLightRange.style.background =
        `linear-gradient(
            to right,
            #000000,
            ${hueColor},
            #ffffff
        )`;
}


mobileHueRange.addEventListener(
    "input",
    updateColorFromMobileSliders
);


mobileLightRange.addEventListener(
    "input",
    updateColorFromMobileSliders
);


mobileHexColor.addEventListener(
    "change",
    function () {

        let color =
            mobileHexColor.value.trim();

        if (!color.startsWith("#")) {
            color = "#" + color;
        }

        if (
            /^#[0-9A-Fa-f]{6}$/.test(color)
        ) {
            applyMobileCustomColor(color);
        }
    }
);


mobileCustomColorBack.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        mobileCustomColorMenu.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "mobile-color-open"
        );
    }
);


textColor.addEventListener(
    "input",
    function () {

        updateMobileTextColor();
    }
);


textColor.addEventListener(
    "input",
    function () {

        updateMobileTextColor();
    }
);


/* =========================================
   COMANDI DEL TESTO SELEZIONATO SU MOBILE
   ========================================= */

function hasMobileSelectedText() {
    return window.innerWidth <= 600 &&
        selectedElementType === "text" && !!getSelectedTextState();
}

function runMobileTextCommand(command) {
    if (!hasMobileSelectedText()) return;
    command();
    // I comandi desktop operano sui campi legacy del testo selezionato.
    syncSelectedTextFromLegacyState();
    renderLayersPanel();
}

function closeMobileTextMenus() {
    document.querySelectorAll(
        ".mobile-text-context-menu, #mobileTextFormatMenu, #mobileTextColorMenu, #mobileCustomColorMenu"
    ).forEach(function (menu) { menu.classList.remove("open"); });
    document.body.classList.remove("mobile-format-open", "mobile-color-open");
}

function toggleMobileTextMenu(menu) {
    if (!hasMobileSelectedText()) return;
    const wasOpen = menu.classList.contains("open");
    closeMobileTextMenus();
    if (wasOpen) return;
    menu.classList.add("open");
    document.body.classList.toggle("mobile-format-open", menu.id === "mobileTextFormatMenu");
    document.body.classList.toggle("mobile-color-open", menu.id === "mobileTextColorMenu");
}

function closeMobileTextMenusOutside(event) {
    if (event.target.closest(
        ".mobile-text-context-menu, #mobileTextSelectionBar, #mobileTextFormatMenu, #mobileTextColorMenu, #mobileCustomColorMenu"
    )) return;
    closeMobileTextMenus();
}

// pointerdown funziona anche quando il drag del testo impedisce il click.
document.addEventListener("pointerdown", closeMobileTextMenusOutside, true);
document.addEventListener("click", closeMobileTextMenusOutside);
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMobileTextMenus();
});

// Un solo snapshot per ogni modifica continua di colore o spessore.
function bindMobileTextHistory(input) {
    let editing = false;
    input.addEventListener("input", function () {
        if (!hasMobileSelectedText()) return;
        if (!editing) saveHistoryState();
        editing = true;
    }, true);
    ["change", "blur"].forEach(function (eventName) {
        input.addEventListener(eventName, function () { editing = false; });
    });
}

const mobileTextFontMenu = document.getElementById("mobileTextFontMenu");
Array.from(fontSelect.options).forEach(function (option) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.textContent;
    button.dataset.font = option.value;
    button.style.fontFamily = option.value;
    button.addEventListener("click", function () {
        runMobileTextCommand(function () {
            fontSelect.value = option.value;
            fontSelect.dispatchEvent(new Event("change", { bubbles: true }));
        });
        closeMobileTextMenus();
    });
    mobileTextFontMenu.appendChild(button);
});

document.getElementById("mobileSelectedTextFont").addEventListener("click", function () {
    if (!hasMobileSelectedText()) return;
    mobileTextFontMenu.querySelectorAll("button").forEach(function (button) {
        const active = button.dataset.font === getCurrentState().fontFamily;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });
    toggleMobileTextMenu(mobileTextFontMenu);
});

const mobileTextAlignMenu = document.getElementById("mobileTextAlignMenu");
const mobileTextAlignCommands = {
    left: textAlignLeft, center: textAlignCenter, right: textAlignRight
};
function updateMobileTextAlignment() {
    mobileTextAlignMenu.querySelectorAll("button").forEach(function (button) {
        const active = button.dataset.textAlign === (getCurrentState().textAlign || "center");
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });
}
mobileTextAlignMenu.querySelectorAll("button").forEach(function (button) {
    button.addEventListener("click", function () {
        runMobileTextCommand(function () {
            mobileTextAlignCommands[button.dataset.textAlign].click();
        });
        updateMobileTextAlignment();
    });
});
document.getElementById("mobileSelectedTextAlign").addEventListener("click", function () {
    if (!hasMobileSelectedText()) return;
    updateMobileTextAlignment();
    toggleMobileTextMenu(mobileTextAlignMenu);
});

const mobileTextOutlineMenu = document.getElementById("mobileTextOutlineMenu");
const mobileTextOutlineEnabled = document.getElementById("mobileTextOutlineEnabled");
const mobileTextOutlineColor = document.getElementById("mobileTextOutlineColor");
const mobileTextOutlineWidth = document.getElementById("mobileTextOutlineWidth");
const mobileTextOutlineWidthValue = document.getElementById("mobileTextOutlineWidthValue");
["min", "max", "step"].forEach(function (attribute) {
    mobileTextOutlineWidth.setAttribute(attribute, textOutlineWidth.getAttribute(attribute));
});
document.getElementById("mobileSelectedTextOutline").addEventListener("click", function () {
    if (!hasMobileSelectedText()) return;
    const state = getCurrentState();
    mobileTextOutlineEnabled.checked = state.textOutlineEnabled;
    mobileTextOutlineColor.value = state.textOutlineColor;
    mobileTextOutlineWidth.value = state.textOutlineWidth;
    mobileTextOutlineWidthValue.textContent = `${state.textOutlineWidth} px`;
    toggleMobileTextMenu(mobileTextOutlineMenu);
});
mobileTextOutlineEnabled.addEventListener("change", function () {
    runMobileTextCommand(function () {
        textOutlineEnabled.checked = mobileTextOutlineEnabled.checked;
        textOutlineEnabled.dispatchEvent(new Event("change", { bubbles: true }));
    });
});
[
    [mobileTextOutlineColor, textOutlineColor],
    [mobileTextOutlineWidth, textOutlineWidth]
].forEach(function ([mobileInput, desktopInput]) {
    bindMobileTextHistory(mobileInput);
    mobileInput.addEventListener("input", function () {
        runMobileTextCommand(function () {
            desktopInput.value = mobileInput.value;
            desktopInput.dispatchEvent(new Event("input", { bubbles: true }));
        });
        mobileTextOutlineWidthValue.textContent = `${getCurrentState().textOutlineWidth} px`;
    });
});
[mobileHueRange, mobileLightRange, mobileHexColor].forEach(bindMobileTextHistory);

document.getElementById("mobileSelectedTextDuplicate").addEventListener("click", function () {
    if (!hasMobileSelectedText()) return;
    closeMobileTextMenus();
    syncSelectedTextFromLegacyState();
    renderLayersPanel();
    const selectedId = getCurrentState().selectedTextId;
    const row = Array.from(layersList.children).find(function (item) {
        return item.dataset.textId === selectedId;
    });
    // Riutilizza integralmente duplicazione, nuovo ID, offset e undo dei Livelli.
    if (row) row.querySelector(".layer-duplicate-button").click();
});
document.getElementById("mobileSelectedTextDelete").addEventListener("click", function () {
    if (!hasMobileSelectedText()) return;
    closeMobileTextMenus();
    directDeleteButton.click();
    updateMobileTextSelectionBar();
});

/* =========================================
   ZOOM VISIVO T-SHIRT MOBILE
   ========================================= */

function applyMobileTshirtZoom(step) {
    if (window.innerWidth > 600 || currentProduct !== "tshirt") {
        return;
    }

    // Scala soltanto il contenitore: stato, misure e coordinate non cambiano.
    previewZoom = Math.max(80, Math.min(160, previewZoom + step));
    updatePreviewZoom();
}

mobileTshirtZoomIn.addEventListener("click", function () {
    applyMobileTshirtZoom(10);
});

mobileTshirtZoomOut.addEventListener("click", function () {
    applyMobileTshirtZoom(-10);
});


/* =========================================
   RESTYLING - MENU DESKTOP E TRASCINA FOTO
   ========================================= */

/*
   Le voci del menu in alto (Cuscini, T-Shirt, Portachiavi)
   cambiano prodotto usando il selettore originale,
   come già fa il menu mobile.
*/
const desktopNavProductLinks =
    document.querySelectorAll("[data-nav-product]");

function updateDesktopNavActive() {
    desktopNavProductLinks.forEach(function (link) {
        link.classList.toggle(
            "active",
            link.dataset.navProduct === productSelect.value
        );
    });
}

desktopNavProductLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        if (productSelect.value !== link.dataset.navProduct) {
            productSelect.value = link.dataset.navProduct;
            productSelect.dispatchEvent(
                new Event("change", { bubbles: true })
            );
        }

        updateDesktopNavActive();
    });
});

productSelect.addEventListener("change", updateDesktopNavActive);
updateDesktopNavActive();


/*
   Trascina e rilascia una foto sul riquadro "Carica una foto".
   Il file viene passato all'input originale, così il resto
   del caricamento (controlli, livelli, undo) resta identico.
*/
const imageUploadDropzone =
    document.getElementById("imageUploadDropzone");

if (imageUploadDropzone) {

    ["dragenter", "dragover"].forEach(function (type) {
        imageUploadDropzone.addEventListener(type, function (event) {
            event.preventDefault();
            imageUploadDropzone.classList.add("is-dragover");
        });
    });

    ["dragleave", "dragend", "drop"].forEach(function (type) {
        imageUploadDropzone.addEventListener(type, function () {
            imageUploadDropzone.classList.remove("is-dragover");
        });
    });

    imageUploadDropzone.addEventListener("drop", function (event) {
        event.preventDefault();

        const files = event.dataTransfer && event.dataTransfer.files;

        if (!files || !files.length) {
            return;
        }

        const transfer = new DataTransfer();
        transfer.items.add(files[0]);
        imageUpload.files = transfer.files;

        imageUpload.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    });
}



/* =========================================
   APERTURA DIRETTA DI UN PRODOTTO DALLA HOME
   es. personalizza.html?prodotto=tshirt
   ========================================= */

(function openProductFromUrl() {

    let requestedProduct =
        new URLSearchParams(window.location.search).get("prodotto");

    /* Vecchi link al portachiavi 4,5x4,5 */
    if (requestedProduct === "keychain") {
        requestedProduct = "keychain-round";
    }

    const exists = [...productSelect.options].some(function (option) {
        return option.value === requestedProduct;
    });

    if (!requestedProduct || !exists) {
        return;
    }

    if (productSelect.value !== requestedProduct) {
        productSelect.value = requestedProduct;
        productSelect.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    }

    updateDesktopNavActive();
})();


/* Apertura diretta del carrello: personalizza.html?carrello=1 */
if (new URLSearchParams(window.location.search).get("carrello") === "1") {
    if (window.innerWidth <= 600) {
        mobileCartButton.click();
    } else {
        cartButton.click();
    }
}


/* =========================================
   COORDINATE STABILI TRA LAYOUT
   Posizioni di foto e scritte e dimensione del carattere sono
   in pixel dell'editor, ma l'area stampabile ha misure diverse
   su mobile e desktop (es. T-shirt 70 px contro 95 px di
   larghezza). Ogni stato ricorda la scala con cui è stato
   modificato (layoutPxPerCm, pixel per cm) e, se la scala
   attuale è diversa, i valori vengono convertiti. Il sistema
   di coordinate resta quello di sempre; la larghezza delle foto
   è già in proporzione all'area e non va toccata.
   ========================================= */

function getLayoutPxPerCm() {

    const areaCm =
        getCurrentPrintAreaCm();

    const widthPx =
        printArea.clientWidth;

    const heightPx =
        printArea.clientHeight;

    if (
        !areaCm ||
        !widthPx ||
        !heightPx
    ) {
        return 0;
    }

    /*
        L'area deve essere già quella del prodotto attuale:
        in un passaggio intermedio (es. cambio prodotto) non
        misuriamo nulla, per non convertire per errore.
    */
    const isTshirtArea =
        printArea.classList.contains("tshirt-print-area");

    const isKeychainArea =
        printArea.classList.contains("keychain-print-area");

    /* Nuovi prodotti (tele, cuori, portachiavi sagomati...) */
    const definition =
        products[currentProduct];

    const genericLayout =
        definition && definition.layout
            ? definition.layout
            : null;

    const isGenericArea =
        printArea.classList.contains("generic-print-area");

    if (
        (currentProduct === "tshirt") !== isTshirtArea ||
        (currentProduct === "keychain") !== isKeychainArea ||
        Boolean(genericLayout) !== isGenericArea ||
        (
            genericLayout &&
            !printArea.classList.contains(`generic-print-${genericLayout}`)
        )
    ) {
        return 0;
    }

    /*
        Lato corto con lato corto, lungo con lungo: verticale e
        orizzontale della T-shirt danno la stessa scala, anche se
        il formato del lato non fosse ancora applicato all'area.
    */
    const sidesPx =
        [widthPx, heightPx].sort(function (a, b) { return a - b; });

    const sidesCm =
        [areaCm.width, areaCm.height].sort(function (a, b) { return a - b; });

    /*
        Proporzioni diverse da quelle in cm: l'area non è ancora
        stata adattata al prodotto (es. due tele dello stesso tipo).
    */
    if (
        Math.abs(
            (sidesPx[0] / sidesPx[1]) /
            (sidesCm[0] / sidesCm[1]) - 1
        ) > 0.05
    ) {
        return 0;
    }

    return (
        sidesPx[0] / sidesCm[0] +
        sidesPx[1] / sidesCm[1]
    ) / 2;
}


function scaleStateLengths(state, ratio) {

    function scaleKeys(target, keys) {

        keys.forEach(function (key) {

            if (
                typeof target[key] === "number" &&
                Number.isFinite(target[key])
            ) {
                target[key] *= ratio;
            }
        });
    }

    /* Campi della foto e della scritta selezionate */
    scaleKeys(state, ["x", "y", "textX", "textY", "textSize"]);

    (state.images || []).forEach(function (imageState) {
        scaleKeys(imageState, ["x", "y"]);
    });

    (state.texts || []).forEach(function (textState) {
        scaleKeys(textState, ["x", "y", "size"]);
    });
}


/*
    Converte gli stati del prodotto visibile (per la T-shirt
    fronte e retro del colore attuale: stessa scala) alla
    scala attuale. Restituisce true se ha cambiato qualcosa.
*/
function rebaseVisibleStatesToLayout() {

    /* Sotto il 3% non convertiamo: arrotondamenti dei bordi. */
    const tolerance = 0.03;

    const pxPerCm =
        getLayoutPxPerCm();

    if (!pxPerCm) {
        return false;
    }

    const states =
        currentProduct === "tshirt"
            ? [
                productStates.tshirt[tshirtColor].front,
                productStates.tshirt[tshirtColor].back
            ]
            : Object.values(
                productStates[currentProduct] || {}
            );

    let changed = false;

    states.forEach(function (state) {

        if (!state) {
            return;
        }

        /* Dati salvati prima di questa funzione: scala attuale. */
        if (!state.layoutPxPerCm) {
            state.layoutPxPerCm = pxPerCm;
            return;
        }

        const ratio =
            pxPerCm / state.layoutPxPerCm;

        if (Math.abs(ratio - 1) < tolerance) {
            return;
        }

        scaleStateLengths(state, ratio);

        state.layoutPxPerCm = pxPerCm;

        changed = true;
    });

    return changed;
}


/*
    Telefono ruotato o finestra ridimensionata oltre i 600px:
    rifacciamo l'anteprima con le misure calibrate del nuovo
    layout (stesse funzioni di sempre); renderCurrentState
    converte poi le coordinate.
*/
(function () {

    let wasMobileLayout =
        window.innerWidth <= 600;

    let resizeTimer = null;


    function handleLayoutResize() {

        const isMobileLayout =
            window.innerWidth <= 600;

        if (isMobileLayout !== wasMobileLayout) {

            wasMobileLayout = isMobileLayout;

            syncSelectedImageFromLegacyState();
            syncSelectedTextFromLegacyState();

            /* La selezione andrebbe ricalcolata: la togliamo. */
            selectedElementType = null;
            selectionControls.style.display = "none";

            uploadedImage.classList.remove("selected-element");
            customText.classList.remove("selected-element");

            updateMobileTextSelectionBar();

            /* Zoom iniziale del nuovo layout, come al cambio prodotto. */
            previewZoom =
                currentProduct === "tshirt"
                    ? (isMobileLayout ? 100 : 150)
                    : 100;

            updateProductPreview();
            updatePreviewZoom();

            return;
        }

        /* Stesso layout: ridisegniamo solo se l'area è cambiata. */
        const state =
            getCurrentState();

        const pxPerCm =
            getLayoutPxPerCm();

        if (
            state &&
            state.layoutPxPerCm &&
            pxPerCm &&
            Math.abs(pxPerCm / state.layoutPxPerCm - 1) >= 0.03
        ) {
            selectionControls.style.display = "none";
            selectedElementType = null;

            renderCurrentState();
        }
    }


    window.addEventListener("resize", function () {

        clearTimeout(resizeTimer);

        resizeTimer =
            setTimeout(handleLayoutResize, 200);
    });
})();
