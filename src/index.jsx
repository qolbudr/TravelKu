/* @refresh reload */
import { render } from 'solid-js/web';
import { HopeProvider, NotificationsProvider } from '@hope-ui/solid'
import App from './App';
import { Router, hashIntegration } from "@solidjs/router";

render(() => (<HopeProvider><NotificationsProvider><Router source={hashIntegration()}><App /></Router></NotificationsProvider></HopeProvider>),document.getElementById('root'));
