---
layout: example
title: Preloaded reCAPTCHA API Example
permalink: /preload-api
feature: preload-api-demo
backlink: example-preload-api
addlCodeTitle1: index.html
addlCodeType1: html
addlCodeContent1: |
    <!-- ... -->
    <script src="https://www.google.com/recaptcha/api.js?render=explicit&amp;onload=onloadCallback"></script>
    <script>
        // bootstrap the application as soon as the reCAPTCHA api has loaded 
        function onloadCallback() {
            System.import('examples/preload-api-demo.main')
                .catch(function(err) { console.error(err); });
        }
    </script>
    <!-- ... -->
headextras: |
    <script src="https://www.google.com/recaptcha/api.js?render=explicit&amp;onload=onloadCallback"></script>
    <script>
        // bootstrap the application as soon as the reCAPTCHA api has loaded 
        function onloadCallback() {
            System.import('examples/preload-api-demo.main')
                .catch(function(err) { console.error(err); });
        }
    </script>
---
