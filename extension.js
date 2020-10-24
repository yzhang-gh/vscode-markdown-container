function activate(context) {

	const htmlEscapes = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	}

	function escapeHtml(html) {
		return html.replace(/[&<>"']/g, chr => htmlEscapes[chr])
	}

	function getRenderFunction(type, arg_reg) {
		if (type === "details") {
			return (tokens, idx) => {
				if (tokens[idx].nesting === 1) {
					// opening tag
					let title = tokens[idx].info.trim().match(arg_reg)[1];
					title = escapeHtml(title);
					return `<details class="custom-block details">${title ? `\n<summary>${title}</summary>\n` : ''}`;
				} else {
					// closing tag
					return '</details>\n';
				}
			};
		} else {
			return (tokens, idx) => {
				if (tokens[idx].nesting === 1) {
					// opening tag
					let title = tokens[idx].info.trim().match(arg_reg)[1];
					title = escapeHtml(title);
					return `<div class="custom-block ${type}">${title ? `\n<p class="custom-block-title">${title}</p>` : ''}\n`;
				} else {
					// closing tag
					return '</div>\n';
				}
			};
		}
	}

	function getRenderOptions(type) {
		const ARG_REG = new RegExp(`^${type}\\s*(.*?)$`);
		return {
			validate: (params) => params.trim().match(ARG_REG) !== null,
			render: getRenderFunction(type, ARG_REG)
		}
	}

	return {
		extendMarkdownIt(md) {
			const containerTypes = ['tip', 'warning', 'details'];
			const mdc = require('markdown-it-container');
			containerTypes.forEach(type => {
				md = md.use(mdc, type, getRenderOptions(type));
			});

			return md;
		}
	};
}

exports.activate = activate;
