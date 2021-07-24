window.addEventListener("load", function () {
    let script = document.querySelector("*[data-uaid]");
    let la = new LinkUpdater({
        UniversalAnalyticsId: script ? script.dataset.uaid : ""
    });

    setTimeout(function () {

        la.updateLinks();

        const observer = new MutationObserver((el, l) => {
            la.updateLinks();
        });

        observer.observe(document.body, {attributes: false, childList: true, subtree: true});

    }, 1);
});

/**
 * PDL google tag link updater
 *
 * @param opt
 * @constructor
 */
function LinkUpdater(opt = {}) {

    let Options = {
        /**
         * Your Universal Analytics Identifier
         *
         *  @var string
         */
        UniversalAnalyticsId: "",
        /**
         * Universal Analytics Id url parameter
         *
         *  @var string
         */
        UniversalAnalyticsIdParameter: "uaip",
        /**
         * Google Analytics Client Id url parameter
         *
         *  @var string
         */
        GoogleAnalyticsClientIdParameter: "utm_device",
        /**
         * Google Click Identifier url parameter
         *
         * @var string
         */
        GoogleClickIdentifierParameter: "gclid",
        /**
         *  Array contains object for replace links.
         *
         *  Object must contain query property and
         *  regex.
         */
        urlReplacePack: [
            {
                /**
                 * Node element query selector.
                 *
                 * @var string
                 */
                query: "a",
                /**
                 * Attribute must be replaced.
                 *
                 * @var string
                 */
                attr: "href",
                /**
                 * Replace url regular expression.
                 *
                 * Used for match url that will be
                 * replaced.
                 *
                 * And used for replace url.
                 *
                 * Must contain 3 groups
                 * 1. match host.
                 * 2. match host ending slash.
                 * 3. match url query.
                 *
                 * @var RegExp
                 */
                regex: new RegExp("(https?:\\/\\/tds\\.pdl-profit\\.com)(\\/)?([^'\"]*)?")
            },
            {
                query: "*[onclick]",
                attr: "onclick",
                regex: new RegExp("(https?:\\/\\/tds\\.pdl-profit\\.com)(\\/)?([^'\"]*)?")
            },
            {
                query: "*[onmouseup]",
                attr: "onmouseup",
                regex: new RegExp("(https?:\\/\\/tds\\.pdl-profit\\.com)(\\/)?([^'\"]*)?")
            },
            {
                query: "*[onmousedown]",
                attr: "onmousedown",
                regex: new RegExp("(https?:\\/\\/tds\\.pdl-profit\\.com)(\\/)?([^'\"]*)?")
            }
        ],
        ...opt
    };

    let This = this;

    /**
     * Returns Universal Analytics Id
     *
     * @returns {string}
     */
    this.getUniversalAnalyticsId = function () {

        return Options.UniversalAnalyticsId;

    };

    /**
     * Returns Google User Id
     *
     * @returns {string}
     */
    this.getGoogleAnalyticsClientId = function () {

        let gaCookie = document.cookie.match(/_ga=([^;]*)/);
        gaCookie = gaCookie.length > 1 ? gaCookie[1] : null;

        if (gaCookie) {

            return gaCookie.split(".").slice(-2).join(".");

        }

        return "";

    };

    /**
     * Returns Google Click Identifier.
     *
     * @returns {string}
     */
    this.getGoogleClickIdentifier = function () {

        let queryData = queryToObj(location.search);

        return queryData.gclid ? queryData.gclid : "";
    };

    /**
     * Adds to all links google tag parameters.
     */
    this.updateLinks = function () {

        Options.urlReplacePack.forEach(replacePack => {

            replacePackUrl(replacePack);

        });

    };

    /**
     * Replaces url in pack.
     *
     * @param pack
     */
    function replacePackUrl(pack) {

        let elements = document.querySelectorAll(pack.query);
        [...elements].forEach(node => {

            let link = node.getAttribute(pack.attr);
            let data = pack.regex.exec(link);

            if (data) {

                let query = prepareNewLinkQuery(data[3]);
                node.setAttribute(pack.attr, link.replace(pack.regex, `${data[1]}/${query}`))

            }

        })

    }

    /**
     * Returns query with new parameters.
     *
     * @param query
     * @returns {string}
     */
    function prepareNewLinkQuery(query) {

        query = typeof query === "string" && query ? query : "";
        let queryData = queryToObj(query);

        queryData[Options.UniversalAnalyticsIdParameter] = This.getUniversalAnalyticsId();
        queryData[Options.GoogleAnalyticsClientIdParameter] = This.getGoogleAnalyticsClientId();
        queryData[Options.GoogleClickIdentifierParameter] = This.getGoogleClickIdentifier();

        return objectToQuery(queryData);

    }

    /**
     * Transform url query to object.
     *
     * @returns {{}}
     */
    function queryToObj(str) {

        let res = str.slice(str.indexOf("?") + 1).split("&");
        let query = {};

        res.forEach(el => {

            el = el.split("=");
            if (el[0]) {
                query[el[0]] = el.length > 1 ? el[1] : null;
            }


        });

        return query

    }

    /**
     * Transform object to url query
     *
     * @param query
     * @returns {string}
     */
    function objectToQuery(query) {

        let res = [];

        for (let slug in query) {

            if (query.hasOwnProperty(slug)) {

                res.push(`${slug}=${query[slug]}`);

            }

        }

        return "?" + (res.join("&"));

    }

}
