(function() {

    var map = {
        'she': 'ze',
        'he': 'ze',
        'her': 'zir',
        'him': 'zir',
        'his': 'zir',
        'hers': 'zirs',
        'his': 'zirs',
        'herself': 'zirself',
        'himself': 'zirself'
    };

    function replace(textNode) {
        if(textNode.parentNode.nodeName in ['STYLE', 'SCRIPT', 'PRE', 'CODE'])
            return;

        var replaced = textNode.data;
        for(var key in map) {
            var value = map[key];
            replaced = replaceOne(replaced, key, value);
            replaced = replaceOne(replaced, key.charAt(0).toUpperCase() + key.slice(1),
                                  value.charAt(0).toUpperCase() + value.slice(1));
            replaced = replaceOne(replaced, key.toUpperCase(), value.toUpperCase());
        }

        if(replaced != textNode.data)
            textNode.data = replaced;
    };

    function replaceOne(string, from, to) {
        var match = string.match(new RegExp('\\b' + from + '\\b'));
        if(!match)
            return string;

        var before = string.slice(0, match.index);
        var after = string.slice(match.index + from.length);

        return before + to + after;
    };

    function replaceTraverse(node) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if(child.nodeType == 1)
                replaceTraverse(child);
            else if(child.nodeType == 3)
                replace(child);
        }
    };

    function replaceAll() {
        var nodes = document.getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            for(var j = 0; j < el.childNodes.length; j++) {
                var node = el.childNodes[j];
                if(node.nodeType == 3)
                    replace(node);
            }
        }
    };

    replaceAll();

    document.addEventListener("DOMNodeInserted", function(e) {
        replaceTraverse(e.target);
    }, false);

})();
