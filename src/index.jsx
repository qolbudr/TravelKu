/* @refresh reload */
import { render } from 'solid-js/web';
import { HopeProvider } from '@hope-ui/solid'
import App from './App';
import { Router, hashIntegration } from "@solidjs/router";

render(() => (<HopeProvider><Router source={hashIntegeration()}><App /></Router></HopeProvider>),document.getElementById('root'));
