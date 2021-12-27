/**
 * Anime un titre avec un effet d'apparition mot par mot
 * @param {string} selector
 */
export function animeTitle(selector) {
    let title = document.querySelectorAll(`.${selector}`);
    if (title === null) {
        console.error(`L'élément ${selector} n'existe pas`);
    }

    title.forEach((el) => {
        let children = Array.from(el.childNodes);
        let elements = [];
        children.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
                spanify(child);
            } else if (child.tagName === "BR") {
                elements.push(child);
            } else {
                elements.concat(spanify(child));
            }
        });

        //console.log(elements)

        el.innerHTML = "";
        elements.forEach((items) => {
            el.appendChild(items);
        });

        Array.from(el.querySelectorAll("span span")).forEach((items, k) => {
            items.style.animationDelay = 0.2 * k + "s";
        });

        /**
         * Sépare et entoure chaque élement de mon titre avec des spans
         * - Retourne un tabelau d'éléments (entouré de span ) à plan
         *
         * @param {Node} child
         * @returns {Node[]}
         */
        function spanify(child) {
            const word = child.textContent.split(" ");
            let spans = word.map(wrapWord);
            spans = spans
                .map((span, index) => {
                    if (index == spans.length - 1) return [span];
                    return [span, document.createTextNode(" ")];
                })
                .reduce((accumulator, currentValue) => {
                    accumulator = accumulator.concat(currentValue);

                    return accumulator;
                }, []);

            elements = elements.concat(spans);
            return elements;
        }
        /**
         * Entoure le mot d'une span
         *
         * @param {string} word
         * @return {HTMLElement} span
         */
        function wrapWord(word) {
            let span = document.createElement("span");
            let span1 = document.createElement("span");
            span1.innerHTML = word;
            span.appendChild(span1);
            return span;
        }
    });
}

