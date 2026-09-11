const imageUpload = document.getElementById("imageUpload");
const uploadedImage = document.getElementById("uploadedImage");
const statusMessage = document.getElementById("statusMessage");

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

    if (selectedElementType === "image") {
        flipImage();
    }

    if (selectedElementType === "text") {
        flipText();
    }
});

bringForwardButton.addEventListener("click", function () {

    if (!selectedElementType) {
        return;
    }

    const state = getCurrentState();

    if (selectedElementType === "image") {

        state.imageLayer = 2;
        state.textLayer = 1;

    } else {

        state.textLayer = 2;
        state.imageLayer = 1;
    }

    uploadedImage.style.zIndex =
        state.imageLayer;

    customText.style.zIndex =
        state.textLayer;

    statusMessage.textContent =
        "Elemento portato davanti.";
});


sendBackwardButton.addEventListener("click", function () {

    if (!selectedElementType) {
        return;
    }

    const state = getCurrentState();

    if (selectedElementType === "image") {

        state.imageLayer = 1;
        state.textLayer = 2;

    } else {

        state.textLayer = 1;
        state.imageLayer = 2;
    }

    uploadedImage.style.zIndex =
        state.imageLayer;

    customText.style.zIndex =
        state.textLayer;

    statusMessage.textContent =
        "Elemento portato dietro.";
});

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

directRotateButton.addEventListener("mousedown", function (event) {

    if (!selectedElementType) {
        return;
    }

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
directMoveButton.addEventListener("mousedown", function (event) {

    if (!selectedElementType) {
        return;
    }

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

        handle.addEventListener("mousedown", function (event) {

            if (!selectedElementType) {
                return;
            }

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

directDeleteButton.addEventListener("click", function () {

    if (!selectedElementType) {
        return;
    }

    const state = getCurrentState();

    if (selectedElementType === "image") {

        state.imageSrc = "";
        state.x = 0;
        state.y = 0;
        state.scale = 1;
        state.rotation = 0;

        uploadedImage.src = "";
        uploadedImage.style.display = "none";

        imageUpload.value = "";

        zoomRange.value = 1;
        rotationRange.value = 0;
        rotationValue.textContent = "0°";

        statusMessage.textContent =
            "Immagine eliminata.";

    } else {

        state.text = "";
        state.textX = 0;
        state.textY = 0;
        state.textSize = 26;
        state.textRotation = 0;

        customText.textContent = "";

        textInput.value = "";
        textSizeRange.value = 26;
        textRotationRange.value = 0;
        textRotationValue.textContent = "0°";

        statusMessage.textContent =
            "Testo eliminato.";
    }

    uploadedImage.classList.remove("selected-element");
customText.classList.remove("selected-element");
    selectedElementType = null;

    selectionControls.style.display = "none";
});

document.addEventListener("mousemove", function (event) {

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
document.addEventListener("mouseup", function () {

    if (!isDirectResizing) {
        return;
    }

    isDirectResizing = false;
});

document.addEventListener("mousemove", function (event) {

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

document.addEventListener("mouseup", function () {

    if (!isDirectRotating) {
        return;
    }

    isDirectRotating = false;

    rotationGuide.style.display = "none";
});

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


function createEmptyState() {

    return {
    imageSrc: "",
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    imageFlipped: false,
    imageLayer: 1,

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

    printBgEnabled: false,
    printBgColor: "#ffffff"
};
}


const productStates = {

    cushion: {
        front: createEmptyState()
    },

    tshirt: {
        front: createEmptyState(),
        back: createEmptyState()
    },

    keychain: {
        front: createEmptyState()
    }

};

let cartItems = JSON.parse(
    localStorage.getItem("mycustomCart")
) || [];


function getCurrentSide() {

    if (currentProduct === "tshirt") {
        return tshirtSide;
    }

    return "front";
}


function getCurrentState() {

    return productStates[currentProduct][getCurrentSide()];
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


    return (
        MIN_IMAGE_SIZE_CM /
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

    printArea.style.backgroundColor =
    state.printBgEnabled
        ? state.printBgColor
        : "transparent";

printBgColor.value =
    state.printBgColor || "#ffffff";


    if (state.imageSrc) {

        uploadedImage.src = state.imageSrc;
        uploadedImage.style.display = "block";

    } else {

        uploadedImage.src = "";
        uploadedImage.style.display = "none";
    }


    textInput.value = state.text;
customText.textContent = state.text;

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

        setTextAlignment("left");

    }
);


textAlignCenter.addEventListener(
    "click",
    function () {

        setTextAlignment("center");

    }
);


textAlignRight.addEventListener(
    "click",
    function () {

        setTextAlignment("right");

    }
);


function resetCurrentState() {

    const side = getCurrentSide();

    productStates[currentProduct][side] =
        createEmptyState();

    imageUpload.value = "";

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

    currentProduct = this.value;

    previewZoom = 100;

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

        state.textX = 0;
        state.textY = 0;

        refreshTextLayout();

        statusMessage.textContent =
            "Testo centrato.";
    }
);


imageUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        statusMessage.textContent =
            "Seleziona un file immagine valido.";

        return;
    }


    const reader = new FileReader();


    reader.onload = function (event) {

        const state = getCurrentState();

        state.imageSrc = event.target.result;

        state.x = 0;
        state.y = 0;

        state.scale = 1;
        state.rotation = 0;

        renderCurrentState();

        statusMessage.textContent =
            "Foto caricata correttamente!";
    };


    reader.readAsDataURL(file);
});


uploadedImage.addEventListener("mousedown", function (event) {

    const state = getCurrentState();
    showSelectionControls(
    uploadedImage,
    "image"
);

    isDragging = true;

    startX = event.clientX - state.x;
    startY = event.clientY - state.y;

    uploadedImage.style.cursor = "grabbing";

    event.preventDefault();
});


document.addEventListener("mousemove", function (event) {

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


document.addEventListener("mouseup", function () {

    isDragging = false;

    uploadedImage.style.cursor = "grab";
    guideVertical.style.display = "none";
guideHorizontal.style.display = "none";
});
let isDraggingText = false;

let textStartX = 0;
let textStartY = 0;


customText.addEventListener("mousedown", function (event) {

    if (!customText.textContent.trim()) {
        return;
    }

    const state = getCurrentState();
    showSelectionControls(
    customText,
    "text"
);

    isDraggingText = true;

    textStartX = event.clientX - state.textX;
    textStartY = event.clientY - state.textY;

    customText.style.cursor = "grabbing";

    event.preventDefault();
});


document.addEventListener("mousemove", function (event) {

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


document.addEventListener("mouseup", function () {

    isDraggingText = false;

    customText.style.cursor = "grab";

    guideVertical.style.display = "none";
guideHorizontal.style.display = "none";
});


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
    "input",
    function () {

        const state =
            getCurrentState();

        state.text =
            this.value;

        customText.textContent =
            state.text;


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

fontSelect.addEventListener("change", function () {

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

textColor.addEventListener("input", function () {

    const state = getCurrentState();

    state.textColor = this.value;

    customText.style.color = state.textColor;
});

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

            document
                .querySelectorAll(".color-button")
                .forEach(function (item) {
                    item.classList.remove("active");
                });

            this.classList.add("active");

            tshirtColor = this.dataset.color;

            updateTshirtMockup();
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

    previewZoom =
        Math.min(160, previewZoom + 5);

    updatePreviewZoom();
});


zoomOutPreviewButton.addEventListener("click", function () {

    previewZoom =
        Math.max(80, previewZoom - 5);

    updatePreviewZoom();
});


resetPreviewZoomButton.addEventListener("click", function () {

    previewZoom = 100;

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


async function captureTshirtSide(side) {

    const originalSide = tshirtSide;
    const originalZoom = previewZoom;
    const originalSelectedElement = selectedElementType;

    try {

        // Passa temporaneamente al lato da fotografare
        tshirtSide = side;

        if (side === "back") {
            printArea.classList.add(
                "tshirt-back-print-area"
            );
        } else {
            printArea.classList.remove(
                "tshirt-back-print-area"
            );
        }

        updateTshirtPrintFormat();
        updateTshirtMockup();
        renderCurrentState();

        // La fotografia viene sempre fatta al 100%
        previewZoom = 100;
        updatePreviewZoom();

        // Nasconde i controlli di modifica
        selectionControls.style.display = "none";

        uploadedImage.classList.remove(
            "selected-element"
        );

        customText.classList.remove(
            "selected-element"
        );

        guideVertical.style.display = "none";
        guideHorizontal.style.display = "none";
        rotationGuide.style.display = "none";

        // Aspetta che il browser abbia aggiornato il lato
        await new Promise(function (resolve) {
            requestAnimationFrame(function () {
                requestAnimationFrame(resolve);
            });
        });

        // Aspetta l'immagine caricata dall'utente
        if (
    uploadedImage.src &&
    uploadedImage.style.display !== "none"
) {

    try {

        await uploadedImage.decode();

    } catch (error) {

        await new Promise(function (resolve) {

            uploadedImage.addEventListener(
                "load",
                resolve,
                { once: true }
            );

            uploadedImage.addEventListener(
                "error",
                resolve,
                { once: true }
            );

        });
    }
}


// Diamo a Chrome il tempo di
// disegnare realmente l'immagine
// dopo la decodifica.
await new Promise(function (resolve) {

    requestAnimationFrame(function () {

        requestAnimationFrame(function () {

            requestAnimationFrame(resolve);

        });

    });

});

        const canvas = await html2canvas(
            productPreview,
            {
                backgroundColor: null,
                scale: 1,

                onclone: function (clonedDocument) {

                    const clonedPreview =
                        clonedDocument.getElementById(
                            "productPreview"
                        );

                    const clonedPrintArea =
                        clonedDocument.getElementById(
                            "printArea"
                        );

                    const clonedSelection =
                        clonedDocument.getElementById(
                            "selectionControls"
                        );

                    const clonedImage =
                        clonedDocument.getElementById(
                            "uploadedImage"
                        );

                    const clonedText =
                        clonedDocument.getElementById(
                            "customText"
                        );

                    if (clonedSelection) {
                        clonedSelection.style.display =
                            "none";
                    }

                    if (clonedPrintArea) {
                        clonedPrintArea.style.border =
                            "none";
                    }

                    if (clonedImage) {
                        clonedImage.classList.remove(
                            "selected-element"
                        );
                    }

                    if (clonedText) {
                        clonedText.classList.remove(
                            "selected-element"
                        );
                    }

                    if (clonedPreview) {
                        clonedPreview
                            .querySelectorAll(
                                ".guide-line, .rotation-guide"
                            )
                            .forEach(function (element) {
                                element.style.display =
                                    "none";
                            });
                    }
                }
            }
        );

        // Riduce la fotografia per il carrello
        // evitando immagini enormi nel localStorage
        const maxSize = 320;

        const ratio = Math.min(
            maxSize / canvas.width,
            maxSize / canvas.height,
            1
        );

        const smallCanvas =
            document.createElement("canvas");

        smallCanvas.width =
            Math.round(canvas.width * ratio);

        smallCanvas.height =
            Math.round(canvas.height * ratio);

        const context =
            smallCanvas.getContext("2d");

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

        // Ripristina esattamente il lato
        // che l'utente stava modificando
        tshirtSide = originalSide;

        if (originalSide === "back") {
            printArea.classList.add(
                "tshirt-back-print-area"
            );
        } else {
            printArea.classList.remove(
                "tshirt-back-print-area"
            );
        }

        updateTshirtPrintFormat();
        updateTshirtMockup();
        renderCurrentState();

        previewZoom = originalZoom;
        updatePreviewZoom();

        selectedElementType =
            originalSelectedElement;
    }
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

    const state = getCurrentState();
    let cartPreviews = null;

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
                front: {
                    ...productStates.tshirt.front
                },

                back: {
                    ...productStates.tshirt.back
                }
            }
            : {
                ...state
            }
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
updateCartCount();
updateProductPreview();
updatePreviewZoom();