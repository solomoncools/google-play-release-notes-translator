<h1>🛸 Google Play Release Notes Translator</h1>
<h2>One click translation for your google play release notes.</h2>
<h3>Written in javascript. Adds appropriate XML tags to each unit of translation.</h3>

<h2>Getting Started</h2>
<ul>
  <li>Download the repository</li>
  <li>Open the index.html in a web browser</li>

  <li>Add your release notes to the left text-area</li>

  <li>Select your input language (default is English)</li>
</ul>

<h2>Input Syntax</h2>
<ul>
  <li>A '+' symbol will be added to the start of lines that do not start with a '*' (asterisk)</li>
  <li>Lines which define sub-features should start with a '*' (asterisk)</li>
</ul>
<h3><i>Example Input</i></h3>
<p>Main Feature 1</p>
<p>* SubFeature A</p>
<p>* SubFeature B</p>
<p>Main Feature 2</p>
<p>* SubFeature A</p>
<h3><i>Example Output</i></h3>
<p>+ Main Feature 1</p>
<p>* SubFeature A</p>
<p>* SubFeature B</p>
<p>+ Main Feature 2</p>
<p>* SubFeature A</p>

<h2>For one-click language translation into all available languages</h2>
<ul>
  <li>Click "Translate Into All"</li>
</ul>

<h2>For single language translation</h2>
<ul>
  <li>Select the output language</li>
  <li>Click "Translate Into One"</li>
</ul>

<h2>P.S. To add more languages, edit translate.js</h2>
