const imageUpload = document.getElementById("imageUpload");
const uploadedImage = document.getElementById("uploadedImage");
const statusMessage = document.getElementById("statusMessage");

const productSelect = document.getElementById("productSelect");
const productPreview = document.getElementById("productPreview");
const printArea = document.getElementById("printArea");

const productTitle = document.getElementById("productTitle");
const printAreaInfo = document.getElementById("printAreaInfo");

const productName = document.getElementById("productName");
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
const guideVertical = document.getElementById("guideVertical");
const guideHorizontal = document.getElementById("guideHorizontal");
const rotationGuide =
    document.getElementById("rotationGuide");

const textSizeRange =
    document.getElementById("textSizeRange");

    const textRotationRange =
    document.getElementById("textRotationRange");
    const textRotationValue =
    document.getElementById("textRotationValue");

const resetButton = document.getElementById("resetButton");
const centerImageButton =
    document.getElementById("centerImageButton");

const centerTextButton =
    document.getElementById("centerTextButton");
    const selectionControls =
    document.getElementById("selectionControls");

const directRotateButton =
    document.getElementById("directRotateButton");

const directMoveButton =
    document.getElementById("directMoveButton");
    const directFlipButton =
    document.getElementById("directFlipButton");
    const directDeleteButton =
    document.getElementById("directDeleteButton");

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

    function showSelectionControls(element, type) {

    selectedElementType = type;

    uploadedImage.classList.remove("selected-element");
    customText.classList.remove("selected-element");

    element.classList.add("selected-element");

    const previewRect =
        productPreview.getBoundingClientRect();

    const elementRect =
        element.getBoundingClientRect();

    const left =
        elementRect.left - previewRect.left;

    const top =
        elementRect.top - previewRect.top;

    selectionControls.style.left =
        `${left}px`;

    selectionControls.style.top =
        `${top}px`;

    selectionControls.style.width =
        `${elementRect.width}px`;

    selectionControls.style.height =
        `${elementRect.height}px`;

    selectionControls.style.transform =
        "none";

    selectionControls.style.display =
        "block";
}

const textResizeObserver = new ResizeObserver(function () {

    if (
        selectedElementType === "text" &&
        customText.textContent.trim()
    ) {
        requestAnimationFrame(function () {

            showSelectionControls(
                customText,
                "text"
            );

        });
    }
});

textResizeObserver.observe(customText);

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

        newScale = Math.max(0.5, newScale);

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

        newTextSize =
            Math.max(10, newTextSize);

        state.textSize =
            Math.round(newTextSize);

        customText.style.fontSize =
            `${state.textSize}px`;

        textSizeRange.value =
            state.textSize;

        fitTextInsidePrintArea();
        keepTextInsidePrintArea();

        showSelectionControls(
            customText,
            "text"
        );
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

            fitTextInsidePrintArea();
keepTextInsidePrintArea();

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

let currentProduct = "cushion";

let tshirtColor = "white";
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
        printInfo: "Area stampabile 30x30 cm"
    },

    tshirt: {
        title: "T-Shirt personalizzabile",
        name: "T-Shirt personalizzata",
        dimensions: "Taglie disponibili: da definire",
        print: "Area massima di stampa: 30x40 cm",
        printInfo: "Area stampabile massima 30x40 cm"
    },

    keychain: {
        title: "Portachiavi quadrato 4,5x4,5 cm",
        name: "Portachiavi personalizzato",
        dimensions: "Dimensione: 4,5x4,5 cm",
        print: "Superficie interamente stampabile",
        printInfo: "Area stampabile 4,5x4,5 cm"
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

    text: "",
textX: 0,
textY: 0,
textSize: 26,
textRotation: 0,
fontFamily: "Arial",
textColor: "#000000",
textFlipped: false
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


function getCurrentSide() {

    if (currentProduct === "tshirt") {
        return tshirtSide;
    }

    return "front";
}


function getCurrentState() {

    return productStates[currentProduct][getCurrentSide()];
}


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

function keepImageInsidePrintArea() {

    const state = getCurrentState();

    const areaRect = printArea.getBoundingClientRect();
    const imageRect = uploadedImage.getBoundingClientRect();

    const halfImageWidth = imageRect.width / 2;
    const halfImageHeight = imageRect.height / 2;

    const maxX = Math.max(
        0,
        (areaRect.width / 2) - halfImageWidth
    );

    const maxY = Math.max(
        0,
        (areaRect.height / 2) - halfImageHeight
    );

    state.x =
        Math.max(-maxX, Math.min(maxX, state.x));

    state.y =
        Math.max(-maxY, Math.min(maxY, state.y));

    updateImageTransform();
}

function fitImageInsidePrintArea() {

    const state = getCurrentState();

    const areaRect = printArea.getBoundingClientRect();
    const imageRect = uploadedImage.getBoundingClientRect();

    if (
        imageRect.width <= areaRect.width &&
        imageRect.height <= areaRect.height
    ) {
        return;
    }

    const widthRatio =
        areaRect.width / imageRect.width;

    const heightRatio =
        areaRect.height / imageRect.height;

    const correction =
        Math.min(widthRatio, heightRatio);

    state.scale =
        state.scale * correction;

    updateImageTransform();

    zoomRange.value = state.scale;
}


function renderCurrentState() {

    const state = getCurrentState();


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

    updateImageTransform();
}


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

    productDimensions.textContent = product.dimensions;
    printDimensions.textContent = product.print;

    printAreaInfo.textContent = product.printInfo;


    productPreview.className = "product-preview";

    productPreview.style.backgroundImage = "";

    printArea.className = "print-area";


    if (currentProduct === "cushion") {

        productPreview.classList.add("cushion-preview");

        tshirtOptions.style.display = "none";
        printFormatOptions.style.display = "none";
    }


    if (currentProduct === "tshirt") {

        productPreview.classList.add("tshirt-preview");

        printArea.classList.add("tshirt-print-area");

        tshirtOptions.style.display = "block";

        updateTshirtMockup();
        printFormatOptions.style.display = "block";
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

    if (currentProduct !== "tshirt") {
        tshirtSide = "front";
    }

    
    updateProductPreview();
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

centerTextButton.addEventListener("click", function () {

    const state = getCurrentState();

    if (!state.text.trim()) {
        statusMessage.textContent =
            "Aggiungi prima un testo.";
        return;
    }

    state.textX = 0;
    state.textY = 0;

    customText.style.transform =
        `translate(
            calc(-50% + ${state.textX}px),
            calc(-50% + ${state.textY}px)
        )
        rotate(${state.textRotation}deg)`;

    statusMessage.textContent =
        "Testo centrato.";
});


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

    const areaRect = printArea.getBoundingClientRect();
const imageRect = uploadedImage.getBoundingClientRect();

const halfImageWidth = imageRect.width / 2;
const halfImageHeight = imageRect.height / 2;

const maxX = Math.max(
    0,
    (areaRect.width / 2) - halfImageWidth
);

const maxY = Math.max(
    0,
    (areaRect.height / 2) - halfImageHeight
);

newX = Math.max(-maxX, Math.min(maxX, newX));
newY = Math.max(-maxY, Math.min(maxY, newY));

state.x = newX;
state.y = newY;

updateImageTransform();

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

    const areaRect = printArea.getBoundingClientRect();
    const textRect = customText.getBoundingClientRect();

    const halfTextWidth = textRect.width / 2;
    const halfTextHeight = textRect.height / 2;

    const maxX = Math.max(
    0,
    (areaRect.width / 2) - halfTextWidth
);

const maxY = Math.max(
    0,
    (areaRect.height / 2) - halfTextHeight
);

    newX = Math.max(-maxX, Math.min(maxX, newX));
    newY = Math.max(-maxY, Math.min(maxY, newY));

    state.textX = newX;
    state.textY = newY;

    const textScaleX =
    state.textFlipped ? -1 : 1;

customText.style.transform =
    `translate(
        calc(-50% + ${state.textX}px),
        calc(-50% + ${state.textY}px)
    )
    rotate(${state.textRotation}deg)
    scaleX(${textScaleX})`;

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


zoomRange.addEventListener("input", function () {

    const state = getCurrentState();

    state.scale = Number(this.value);

    updateImageTransform();
});


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
});


textInput.addEventListener("input", function () {

    const state = getCurrentState();

    state.text = this.value;

    customText.textContent = state.text;
});

fontSelect.addEventListener("change", function () {

    const state = getCurrentState();

    state.fontFamily = this.value;

    customText.style.fontFamily = state.fontFamily;
});

textColor.addEventListener("input", function () {

    const state = getCurrentState();

    state.textColor = this.value;

    customText.style.color = state.textColor;
});

function fitTextInsidePrintArea() {

    const state = getCurrentState();

    let textRect = customText.getBoundingClientRect();
    const areaRect = printArea.getBoundingClientRect();

    while (
        (textRect.width > areaRect.width ||
         textRect.height > areaRect.height) &&
        state.textSize > 10
    ) {

        state.textSize--;

        customText.style.fontSize =
            `${state.textSize}px`;

        textRect = customText.getBoundingClientRect();
    }

    textSizeRange.value = state.textSize;
}
textSizeRange.addEventListener("input", function () {

    const state = getCurrentState();

    state.textSize = Number(this.value);

    customText.style.fontSize =
        `${state.textSize}px`;

    fitTextInsidePrintArea();
    keepTextInsidePrintArea();

    if (selectedElementType === "text") {
        showSelectionControls(
            customText,
            "text"
        );
    }
});

function keepTextInsidePrintArea() {

    const state = getCurrentState();

    const areaRect = printArea.getBoundingClientRect();
    const textRect = customText.getBoundingClientRect();

    const halfTextWidth = textRect.width / 2;
    const halfTextHeight = textRect.height / 2;

    const maxX = Math.max(
        0,
        (areaRect.width / 2) - halfTextWidth
    );

    const maxY = Math.max(
        0,
        (areaRect.height / 2) - halfTextHeight
    );

    state.textX =
        Math.max(-maxX, Math.min(maxX, state.textX));

    state.textY =
        Math.max(-maxY, Math.min(maxY, state.textY));

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

    fitTextInsidePrintArea();
    keepTextInsidePrintArea();
}

updateProductPreview();