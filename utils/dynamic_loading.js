/**
 * @module dynamic_loading - loading scripts dynamically
 */
;['function', 'lambda', 'snake'].forEach(name => {
    document.writeln(`<script src="${name}/${name}.js"    ><` + `/script>`)
    document.writeln(`<script src="${name}/${name}Test.js"><` + `/script>`)
})
