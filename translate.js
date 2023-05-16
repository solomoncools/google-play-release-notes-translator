$(document).ready(function() {
    initLanguageOptions();
});

$('#button').click(function(){
    translate();
});
$('#button-all-translate').click(function(){
    allTranslate();
});

var languages = [
    {key: "af", name: "Afrikaans", xml: "af"},
    {key: "am", name: "Amharic", xml: "am"},
    {key: "ar", name: "Arabic", xml: "ar"},
    {key: "hy-AM", name: "Armenian", xml: "hy-AM"},
    {key: "az-AZ", name: "Azerbaijani", xml: "az-AZ"},
    {key: "eu-ES", name: "Basque", xml: "eu-ES"},
    {key: "be", name: "Belarusian", xml: "be"},
    {key: "bn-BD", name: "Bengali", xml: "bn-BD"},
    {key: "bg", name: "Bulgarian", xml: "bg"},
    {key: "my-MM", name: "Burmese", xml: "my-MM"},
    {key: "ca", name: "Catalan", xml: "ca"},
    {key: "zh-CN", name: "Chinese (Simplified)", xml: "zh-CN"},
    {key: "zh-TW", name: "Chinese (Traditional)", xml: "zh-TW"},
    {key: "hr", name: "Croatian", xml: "hr"},
    {key: "cs-CZ", name: "Czech", xml: "cs-CZ"},
    {key: "da-DK", name: "Danish", xml: "da-DK"},
    {key: "nl-NL", name: "Dutch", xml: "nl-NL"},
    {key: "en-US", name: "English (United States)", xml: "en-US"},
    {key: "et", name: "Estonian", xml: "et"},
    {key: "fil", name: "Filipino", xml: "fil"},
    {key: "fi-FI", name: "Finnish", xml: "fi-FI"},
    {key: "fr-FR", name: "French", xml: "fr-FR"},
    {key: "gl-ES", name: "Galician", xml: "gl-ES"},
    {key: "ka-GE", name: "Georgian", xml: "ka-GE"},
    {key: "de-DE", name: "German", xml: "de-DE"},
    {key: "el-GR", name: "Greek", xml: "el-GR"},
    {key: "iw-IL", name: "Hebrew", xml: "iw-IL"},
    {key: "hi-IN", name: "Hindi", xml: "hi-IN"},
    {key: "hu-HU", name: "Hungarian", xml: "hu-HU"},
    {key: "is-IS", name: "Icelandic", xml: "is-IS"},
    {key: "id", name: "Indonesian", xml: "id"},
    {key: "it-IT", name: "Italian", xml: "it-IT"},
    {key: "ja-JP", name: "Japanese", xml: "ja-JP"},
    {key: "kn-IN", name: "Kannada", xml: "kn-IN"},
    {key: "km-KH", name: "Khmer", xml: "km-KH"},
    {key: "ko-KR", name: "Korean (South Korea)", xml: "ko-KR"},
    {key: "ky-KG", name: "Kyrgyz", xml: "ky-KG"},
    {key: "lo-LA", name: "Lao", xml: "lo-LA"},
    {key: "lv", name: "Latvian", xml: "lv"},
    {key: "lt", name: "Lithuanian", xml: "lt"},
    {key: "mk-MK", name: "Macedonian", xml: "mk-MK"},
    {key: "ms", name: "Malay", xml: "ms"},
    {key: "ml-IN", name: "Malayalam", xml: "ml-IN"},
    {key: "mr-IN", name: "Marathi", xml: "mr-IN"},
    {key: "mn-MN", name: "Mongolian", xml: "mn-MN"},
    {key: "ne-NP", name: "Nepali", xml: "ne-NP"},
    {key: "no-NO", name: "Norwegian", xml: "no-NO"},
    {key: "fa", name: "Persian", xml: "fa"},
    {key: "pl-PL", name: "Polish", xml: "pl-PL"},
    {key: "pt-PT", name: "Portuguese (Portugal)", xml: "pt-PT"},
    {key: "ro", name: "Romanian", xml: "ro"},
    {key: "ru-RU", name: "Russian", xml: "ru-RU"},
    {key: "sr", name: "Serbian", xml: "sr"},
    {key: "si-LK", name: "Sinhala", xml: "si-LK"},
    {key: "sk", name: "Slovak", xml: "sk"},
    {key: "sl", name: "Slovenian", xml: "sl"},
    {key: "es-ES", name: "Spanish (Spain)", xml: "es-ES"},
    {key: "sw", name: "Swahili", xml: "sw"},
    {key: "sv-SE", name: "Swedish", xml: "sv-SE"},
    {key: "ta-IN", name: "Tamil", xml: "ta-IN"},
    {key: "te-IN", name: "Telugu", xml: "te-IN"},
    {key: "th", name: "Thai", xml: "th"},
    {key: "tr-TR", name: "Turkish", xml: "tr-TR"},
    {key: "uk", name: "Ukrainian", xml: "uk"},
    {key: "vi", name: "Vietnamese", xml: "vi"},
    {key: "zu", name: "Zulu", xml: "zu"}
]

function initLanguageOptions() {
    console.log(languages);
    languages.forEach(function(lang) {
        $("#inputLanguages").append("<option value=\""+ lang.key +"\">"+ lang.name +"</option>");
        $("#outputLanguages").append("<option value=\""+ lang.key +"\">"+ lang.name +"</option>");
    });
    $("#inputLanguages").val("en-US");
}

function getLanguageData(key) {
    var res = languages.find(x => x.key === key);
    return res;
}

function translate(){
    var sourceText = $('textarea#sourceText').val();

    var sourceLang = $("#inputLanguages").find(":selected").val();
    var targetLang = $("#outputLanguages").find(":selected").val();

    console.log('converting from ' + sourceLang + " to " + targetLang);
    
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    console.log(url);
  
    $.getJSON(url, function(data) {
        var xmlmarkup = getLanguageData(targetLang).xml;
        var line_output = "";
        for(var i = 0; i < data[0].length; i++) {
            var _data = data[0][i][0];
            if(_data.charAt(0) != "*") {
                _data = "+ " + _data;
            }
            line_output += _data;
        }
        var output = "<"+xmlmarkup+">\n" + line_output + "\n</"+xmlmarkup+">";
        $('textarea#resultText').val(output);
    });
}

function allTranslate(){
    var sourceText = $('textarea#sourceText').val();

    var sourceLang = $("#inputLanguages").find(":selected").val();

    var allOutput = "";
    
    languages.forEach(function(lang) {
        var _targetLang = getLanguageData(lang.key).key;
        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + _targetLang + "&dt=t&q=" + encodeURI(sourceText);
        console.log(url);
    
        $.getJSON(url, function(data) {
            var xmlmarkup = getLanguageData(_targetLang).xml;
            
            var line_output = "";
            for(var i = 0; i < data[0].length; i++) {
                var _data = data[0][i][0];
                if(_data.charAt(0) != "*") {
                    _data = "+ " + _data;
                }
                console.log(_data);
                line_output += _data;
            }

            allOutput += "<"+xmlmarkup+">\n" + line_output + "\n</"+xmlmarkup+">" + "\n";
            $('textarea#resultText').val(allOutput);
        });
    });
}
