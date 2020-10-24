Adds [markdown-it-container](https://github.com/markdown-it/markdown-it-container) support to VS Code.

**Input**

```markdown
::: tip
This is a _tip_
:::

::: details
This is a details block
:::
```

**Output**

<div class="tip">
<p>This is a <em>tip</em></p>
</div>

<details>
<summary>Details</summary>

<p>This is a details block</p>

</details>

**Output (HTML)**

```html
<div class="tip">
<p>This is a <em>tip</em></p>
</div>

<details>
<summary>Details</summary>

<p>This is a details block</p>

</details>
```

### More

[Vuepress Custom Containers](https://vuepress.vuejs.org/guide/markdown.html#custom-containers)
