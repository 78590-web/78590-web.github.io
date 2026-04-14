mixins.mermaid = {
    created() {
        this.renderers.push(this.initMermaid);
    },
    methods: {
        initMermaid() {
            if (typeof mermaid === "undefined") return;
            mermaid.initialize({
                startOnLoad: false,
                theme: this.mermaidTheme || "default",
                securityLevel: "loose",
            });
            let elements = document.querySelectorAll("pre.mermaid");
            for (let el of elements) {
                let code = el.textContent.trim();
                let container = document.createElement("div");
                container.classList.add("mermaid");
                el.replaceWith(container);
                try {
                    mermaid.render("mermaid-" + Math.random().toString(36).substr(2, 9), code).then(({ svg }) => {
                        container.innerHTML = svg;
                    });
                } catch (e) {
                    container.textContent = code;
                }
            }
        },
    },
};