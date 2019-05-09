// URL: https://observablehq.com/@skyggen/test
// Title: test
// Author: Adrien Ciampone (@skyggen)
// Version: 140
// Runtime version: 1

document.getElementById('random').innerHTML

const m0 = {
    id: "32b81d2481b9302f@140",
    variables: [
        {
            inputs: ["md"],
            value: (function (md) {
                return (
                    md`# test`
                )
            })
        },
        {
            from: "@skyggen/import-utils",
            name: "button",
            remote: "button"
        },
        {
            from: "@skyggen/import-utils",
            name: "api_key",
            remote: "api_key"
        },
        {
            from: "@skyggen/import-utils",
            name: "randomNumberBetween",
            remote: "randomNumberBetween"
        },
        {
            name: "configurations",
            inputs: ["api_key"],
            value: (async function (api_key) {
                return (
                    (await fetch(`https://api.themoviedb.org/3/configuration?api_key=${api_key}`)).json()
                )
            })
        },
        {
            name: "imageBaseUrl",
            inputs: ["configurations"],
            value: (function (configurations) {
                return (
                    configurations.images.base_url
                )
            })
        },
        {
            name: "getTvDetail",
            inputs: ["api_key"],
            value: (function (api_key) {
                return (
                    async tvId => (await fetch(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${api_key}&language=FR`)).json()
                )
            })
        },
        {
            name: "getTvsOfNthPage",
            inputs: ["api_key"],
            value: (function (api_key) {
                return (
                    async (nthPage) => {
                        return (await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=FR&page=${nthPage}`)).json();
                    }
                )
            })
        },
        {
            name: "getRandomTv",
            inputs: ["getTvsOfNthPage", "randomNumberBetween"],
            value: (function (getTvsOfNthPage, randomNumberBetween) {
                return (
                    async () => {
                        const initialRequest = await getTvsOfNthPage(1);
                        const totalPages = initialRequest.total_pages;
                        const randomPageNumber = randomNumberBetween(1, totalPages);
                        const randomPage = await getTvsOfNthPage(randomPageNumber);
                        const randomEntryNumber = randomNumberBetween(0, randomPage.results.length - 1);
                        return randomPage.results[randomEntryNumber];
                    }
                )
            })
        },
        {
            name: "posterSizeLowRes",
            inputs: ["configurations"],
            value: (function (configurations) {
                return (
                    configurations.images.poster_sizes[0]
                )
            })
        },
        {
            name: "posterSizeHighRes",
            inputs: ["configurations"],
            value: (function (configurations) {
                return (
                    configurations.images.poster_sizes[configurations.images.poster_sizes.length - 1]
                )
            })
        },
        {
            name: "posterSizeDefaultRes",
            value: (function () {
                return (
                    "w500"
                )
            })
        },
        {
            name: "getPosterUrl",
            inputs: ["imageBaseUrl"],
            value: (function (imageBaseUrl) {
                return (
                    (tv, resolution) => `${imageBaseUrl}${resolution}${tv.poster_path}`
                )
            })
        },
        {
            name: "randomTv",
            inputs: ["getRandomTv", "getTvDetail", "api_key", "html", "getPosterUrl", "posterSizeDefaultRes", "md"],
            value: (function (getRandomTv, getTvDetail, api_key, html, getPosterUrl, posterSizeDefaultRes, md) {
                return (
                    async () => {
                        var tv = {};
                        try {
                            tv.rawTv = await getRandomTv();
                            tv.detail = await getTvDetail(tv.rawTv.id);
                            tv.id = tv.rawTv.id;
                            tv.imdbUrl = `https://www.imdb.com/title/${tv.detail.imdb_id}/`;
                            const credits = await (await fetch(`https://api.themoviedb.org/3/tv/${tv.rawTv.id}/credits?api_key=${api_key}`)).json();
                            tv.casts = credits.cast;
                            tv.crew = credits.crew;
                            tv.overview = html`
        <h3>${tv.detail.name}</h3>
        <a href="${tv.imdbUrl}" target="_blank" title="Click for details on IMDb"><img src="${getPosterUrl(tv.rawTv, posterSizeDefaultRes)}" /></a>
        <div>${tv.detail.overview}</div>
  <div>Nombre d'épisode: ${tv.detail.number_of_episodes}</div>
  <div>${tv.detail.popularity}</div>
  <div>${tv.detail.id}</div>
  <div>Moyenne des votes ${tv.detail.vote_average}</div>
  
        <div id="tv.rawTv" style="display:none">${JSON.stringify(tv.rawTv)}</div>
        <div id="tv.detail" style="display:none">${JSON.stringify(tv.detail)}</div>`;
                        } catch (ex) {
                            tv.presentation = md`### Error fetching a random tv!!!`
                            console.error(ex);
                        }
                        return tv;
                    }
                )
            })
        },
        {
            name: "viewof randomizer",
            inputs: ["button"],
            value: (function (button) {
                return (
                    button({ value: "Another tv show" })
                )
            })
        },
        {
            name: "randomizer",
            inputs: ["Generators", "viewof randomizer"],
            value: (G, _) => G.input(_)
        },
        {
            inputs: ["randomizer", "randomTv"],
            value: (async function (randomizer, randomTv) {
                randomizer;
                return (await randomTv()).overview
            }
            )
        }
    ]
};

const m1 = {
    id: "@skyggen/import-utils",
    variables: [
        {
            from: "@jashkenas/inputs",
            name: "button",
            remote: "button"
        },
        {
            name: "api_key",
            value: (function () {
                return (
                    "e0c090ad9289504f572875f449a5f944"
                )
            })
        },
        {
            name: "randomNumberBetween",
            value: (function () {
                return (
                    (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
                )
            })
        }
    ]
};

const m2 = {
    id: "@jashkenas/inputs",
    variables: [
        {
            name: "button",
            inputs: ["input"],
            value: (function (input) {
                return (
                    function button(config = {}) {
                        let { value, title, description, disabled } = config;
                        if (typeof config == "string") value = config;
                        if (!value) value = "Ok";
                        const form = input({
                            type: "button", title, description,
                            attributes: { disabled, value }
                        });
                        form.output.remove();
                        return form;
                    }
                )
            })
        },
        {
            name: "input",
            inputs: ["html", "d3format"],
            value: (function (html, d3format) {
                return (
                    function input(config) {
                        let {
                            form,
                            type = "text",
                            attributes = {},
                            action,
                            getValue,
                            title,
                            description,
                            format,
                            display,
                            submit,
                            options
                        } = config;
                        const wrapper = html`<div></div>`;
                        if (!form)
                            form = html`<form>
      <input name=input type=${type} />
    </form>`;
                        Object.keys(attributes).forEach(key => {
                            const val = attributes[key];
                            if (val != null) form.input.setAttribute(key, val);
                        });
                        if (submit)
                            form.append(
                                html`<input name=submit type=submit style="margin: 0 0.75em" value="${
                                    typeof submit == "string" ? submit : "Submit"
                                    }" />`
                            );
                        form.append(
                            html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
                        );
                        if (title)
                            form.prepend(
                                html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
                            );
                        if (description)
                            form.append(
                                html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
                            );
                        if (format) format = typeof format === "function" ? format : d3format.format(format);
                        if (action) {
                            action(form);
                        } else {
                            const verb = submit
                                ? "onsubmit"
                                : type == "button"
                                    ? "onclick"
                                    : type == "checkbox" || type == "radio"
                                        ? "onchange"
                                        : "oninput";
                            form[verb] = e => {
                                e && e.preventDefault();
                                const value = getValue ? getValue(form.input) : form.input.value;
                                if (form.output) {
                                    const out = display ? display(value) : format ? format(value) : value;
                                    if (out instanceof window.Element) {
                                        while (form.output.hasChildNodes()) {
                                            form.output.removeChild(form.output.lastChild);
                                        }
                                        form.output.append(out);
                                    } else {
                                        form.output.value = out;
                                    }
                                }
                                form.value = value;
                                if (verb !== "oninput")
                                    form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
                            };
                            if (verb !== "oninput")
                                wrapper.oninput = e => e && e.stopPropagation() && e.preventDefault();
                            if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
                            form[verb]();
                        }
                        while (form.childNodes.length) {
                            wrapper.appendChild(form.childNodes[0]);
                        }
                        form.append(wrapper);
                        return form;
                    }
                )
            })
        },
        {
            name: "d3format",
            inputs: ["require"],
            value: (function (require) {
                return (
                    require("d3-format@1")
                )
            })
        }
    ]
};

const notebook = {
    id: "32b81d2481b9302f@140",
    modules: [m0, m1, m2]
};

export default notebook;