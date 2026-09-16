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


        localStorage.setItem(
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

    function showSelectionControls(element, type) {

    selectedElementType = type;

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

productPreview.addEventListener("mousedown", function (event) {

    if (
        event.target === uploadedImage ||
        event.target === customText ||
        selectionControls.contains(event.target)
    ) {
        return;
    }

    uploadedImage.classList.remove("selected-element");
    customText.classList.remove("selected-element");

    selectionControls.style.display = "none";

    selectedElementType = null;
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

        startX = event.clientX - state.x;
        startY = event.clientY - state.y;

        uploadedImage.style.cursor = "grabbing";

    } else {

        isDraggingText = true;

        textStartX =
            event.clientX - state.textX;

        textStartY =
            event.clientY - state.textY;

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
let tshirtSide = "front";
let tshirtPrintFormat = {
    front: "vertical",
    back: "vertical"
};


const products = {

    cushion: {
        title: "Cuscino 40x40 cm",
        name: "Cuscino personalizzato",
        dimensions: "Dimensione: 40x40 cm",
        print: "Area di stampa: 30x30 cm",
        printInfo: "Area stampabile 30x30 cm",
        price: 19.90
    },

    tshirt: {
        title: "T-Shirt personalizzabile",
        name: "T-Shirt personalizzata",
        dimensions: "Taglie disponibili: S, M, L, XL, XXL",
        print: "Area massima di stampa: 30x40 cm",
        printInfo: "Area stampabile massima 30x40 cm",
        price: 19.90
    },

    keychain: {
        title: "Portachiavi quadrato 4,5x4,5 cm",
        name: "Portachiavi personalizzato",
        dimensions: "Dimensione: 4,5x4,5 cm",
        print: "Superficie interamente stampabile",
        printInfo: "Area stampabile 4,5x4,5 cm",
        price: 14.90
    }

};


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

        tshirtSide:
            tshirtSide,

        tshirtPrintFormat:
            tshirtPrintFormat,

        productStates:
            productStates
    };


    try {

        localStorage.setItem(
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
        localStorage.getItem(
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

    if (savedConfigurator.tshirtColor) {
        tshirtColor =
            savedConfigurator.tshirtColor;
    }

    if (savedConfigurator.tshirtSize) {
        tshirtSize =
            savedConfigurator.tshirtSize;
    }

    if (savedConfigurator.tshirtSide) {
        tshirtSide =
            savedConfigurator.tshirtSide;
    }

    if (savedConfigurator.tshirtPrintFormat) {
        tshirtPrintFormat =
            savedConfigurator.tshirtPrintFormat;
    }
}

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

    undoButton.disabled =
        undoStack.length === 0;

    redoButton.disabled =
        redoStack.length === 0;
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

    tshirtSide =
        data.tshirtSide;

    tshirtPrintFormat =
        data.tshirtPrintFormat;

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
    localStorage.getItem("mycustomCart")
) || [];


function getCurrentSide() {

    if (currentProduct === "tshirt") {
        return tshirtSide;
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

    if (currentProduct === "cushion") {

        return {
            width: 30,
            height: 30
        };
    }


    if (currentProduct === "keychain") {

        return {
            width: 4.5,
            height: 4.5
        };
    }


    if (currentProduct === "tshirt") {

        if (
            tshirtPrintFormat[tshirtSide] ===
            "vertical"
        ) {

            return {
                width: 20,
                height: 30
            };

        } else {

            return {
                width: 30,
                height: 20
            };
        }
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


    const widthCm =
        imageWidthPx / pixelsPerCmX;

    const heightCm =
        imageHeightPx / pixelsPerCmY;


    imageSizeValue.textContent =
        `${widthCm.toFixed(1)} × ` +
        `${heightCm.toFixed(1)} cm`;
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


        widthCm =
            (
                uploadedImage.offsetWidth *
                state.scale
            ) /
            pixelsPerCmX;

        heightCm =
            (
                uploadedImage.offsetHeight *
                state.scale
            ) /
            pixelsPerCmY;

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
    currentProduct === "keychain"
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


function renderCurrentState() {

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

    productTitle.textContent = product.title;
    productName.textContent = product.name;
    productPrice.textContent =
    `€${product.price.toFixed(2).replace(".", ",")}`;

    productDimensions.textContent = product.dimensions;
    printDimensions.textContent = product.print;

    printAreaInfo.textContent = product.printInfo;


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

    updateTshirtPrintFormat();
    updateTshirtMockup();
}


    if (currentProduct === "keychain") {

        productPreview.classList.add("keychain-preview");

        printArea.classList.add("keychain-print-area");

        tshirtOptions.style.display = "none";
        printFormatOptions.style.display = "none";
    }


    renderCurrentState();
}


function updateTshirtMockup() {

    let imagePath = "";


    if (tshirtColor === "black") {

        if (tshirtSide === "front") {

            imagePath =
                "assets/tshirt-black-front.png";

        } else {

            imagePath =
                "assets/tshirt-black-back.png";
        }

    } else {

        if (tshirtSide === "front") {

            imagePath =
                "assets/tshirt-white-front.png";

        } else {

            imagePath =
                "assets/tshirt-white-back.png";
        }
    }


    productPreview.style.backgroundImage =
        `url("${imagePath}")`;
}


productSelect.addEventListener("change", function () {

    syncSelectedTextFromLegacyState();
    
    currentProduct = this.value;

    previewZoom =
    currentProduct === "tshirt"
        ? 150
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

    startX = event.clientX - state.x;
    startY = event.clientY - state.y;

    uploadedImage.style.cursor = "grabbing";

    event.preventDefault();
});


document.addEventListener("pointermove", function (event) {

    if (!isDragging) {
        return;
    }

    const state = getCurrentState();

    let newX = event.clientX - startX;
    let newY = event.clientY - startY;

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

    textStartX = event.clientX - state.textX;
    textStartY = event.clientY - state.textY;

    customText.style.cursor = "grabbing";

    event.preventDefault();
});


document.addEventListener("pointermove", function (event) {

    if (!isDraggingText) {
        return;
    }

    const state = getCurrentState();

    let newX = event.clientX - textStartX;
    let newY = event.clientY - textStartY;
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

    if (currentProduct !== "tshirt") {
        return;
    }

    if (tshirtPrintFormat[tshirtSide] === "vertical") {

        printArea.style.width = "95px";
        printArea.style.height = "142px";
        if (tshirtSide === "back") {
        printArea.style.top = "47%";
    } else {
        printArea.style.top = "50%";
    }

    } else {

        printArea.style.width = "142px";
        printArea.style.height = "95px";
        if (tshirtSide === "back") {
        printArea.style.top = "44%";
    } else {
        printArea.style.top = "47%";
    }
    }

    requestAnimationFrame(function () {

        updateMinimumImageScale();
        updateMaximumImageScale();

    fitImageInsidePrintArea();
    keepImageInsidePrintArea();

    fitTextInsidePrintArea();
    keepTextInsidePrintArea();

    updateImageSizeInfo();

    if (selectedElementType === "image") {
        showSelectionControls(uploadedImage, "image");
    } else if (selectedElementType === "text") {
        showSelectionControls(customText, "text");
    }
});
}

let previewZoom = 100;

function updatePreviewZoom() {

        previewZoomRange.max =
        currentProduct === "tshirt"
            ? 180
            : 160;

    const scale = previewZoom / 100;

    let horizontalOffset = 0;

    if (currentProduct === "tshirt") {

        if (tshirtSide === "front") {
            horizontalOffset = -37;
        } else {
            horizontalOffset = 41;
        }
    }

    const scaledOffset =
        horizontalOffset * scale;

    productPreview.style.transform =
        `translateX(${scaledOffset}px) scale(${scale})`;

    productPreview.style.transformOrigin =
        "center center";

    previewZoomRange.value = previewZoom;

    previewZoomValue.textContent =
        `${previewZoom}%`;
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
        ? 150
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


    let imagePath = "";


    if (item.tshirtColor === "black") {

        imagePath =
            side === "front"
                ? "assets/tshirt-black-front.png"
                : "assets/tshirt-black-back.png";

    } else {

        imagePath =
            side === "front"
                ? "assets/tshirt-white-front.png"
                : "assets/tshirt-white-back.png";
    }


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
    let mockupPath = "";


    if (tshirtColor === "black") {

        mockupPath =
            side === "front"
                ? "assets/tshirt-black-front.png"
                : "assets/tshirt-black-back.png";

    } else {

        mockupPath =
            side === "front"
                ? "assets/tshirt-white-front.png"
                : "assets/tshirt-white-back.png";
    }


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


    if (format === "vertical") {

        printAreaCopy.style.width =
            "95px";

        printAreaCopy.style.height =
            "142px";

        printAreaCopy.style.top =
            side === "back"
                ? "47%"
                : "50%";

    } else {

        printAreaCopy.style.width =
            "142px";

        printAreaCopy.style.height =
            "95px";

        printAreaCopy.style.top =
            side === "back"
                ? "44%"
                : "47%";
    }


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



async function createTshirtCartCanvas(side) {

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


    const state =
        productStates
            .tshirt[side];


    /*
        =========================
        MOCKUP T-SHIRT
        =========================
    */
    let mockupPath = "";


    if (tshirtColor === "black") {

        mockupPath =
            side === "front"
                ? "assets/tshirt-black-front.png"
                : "assets/tshirt-black-back.png";

    } else {

        mockupPath =
            side === "front"
                ? "assets/tshirt-white-front.png"
                : "assets/tshirt-white-back.png";
    }


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


    let areaWidth;
    let areaHeight;
    let areaTopPercent;


    if (
        format === "vertical"
    ) {

        areaWidth =
            95;

        areaHeight =
            142;

        areaTopPercent =
            side === "back"
                ? 47
                : 50;

    } else {

        areaWidth =
            142;

        areaHeight =
            95;

        areaTopPercent =
            side === "back"
                ? 44
                : 47;
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


            context.rotate(
                imageState.rotation *
                Math.PI /
                180
            );


            context.scale(
                imageState.flipped
                    ? -imageState.scale
                    : imageState.scale,

                imageState.scale
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


        const canvas =
            await html2canvas(
                productPreview,
                {
                    backgroundColor:
                        null,

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
        item.product === "tshirt" &&
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
            item.customization
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
        item.printFormat.front === "horizontal"
            ? "30x20"
            : "20x30";


    const backFormat =
        item.printFormat.back === "horizontal"
            ? "30x20"
            : "20x30";


    details =
    `${color}` +
    `<br>Taglia: ${item.tshirtSize || "Non specificata"}` +
    `<br>Fronte: ${frontFormat}` +
    `<br>Retro: ${backFormat}`;
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


let cartPreviews = null;


if (currentProduct === "tshirt") {

    cartPreviews =
        await captureTshirtPreviews();


} else {

    cartPreviews =
        await captureCurrentProductPreview();
}

    const cartItem = {

    id: Date.now(),

    product: currentProduct,

    unitPrice:
        products[currentProduct].price,

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


    printFormat:
        currentProduct === "tshirt"
            ? {
                front: tshirtPrintFormat.front,
                back: tshirtPrintFormat.back
            }
            : null,


    customization:
    currentProduct === "tshirt"
        ? {
            front:
                createCartStateCopy(
                    productStates
                        .tshirt
                        .front
                ),

            back:
                createCartStateCopy(
                    productStates
                        .tshirt
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

JSON.stringify(item.printFormat) ===
                JSON.stringify(cartItem.printFormat) &&

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


localStorage.setItem(
    "mycustomCart",
    JSON.stringify(cartItems)
);

updateCartCount();

statusMessage.textContent =
    `${products[currentProduct].name} aggiunto al carrello.`;
});

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