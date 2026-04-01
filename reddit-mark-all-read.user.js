// ==UserScript==
// @name         Reddit - Mark All Messages Read
// @namespace    https://old.reddit.com/
// @version      1.0.0
// @description  Adds a "Mark All as Read" button to old.reddit.com's unread messages page
// @author       log
// @match        https://old.reddit.com/message/unread*
// @match        https://old.reddit.com/message/unread/*
// @grant        none
// @run-at       document-idle
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  const BTN_ID = 'mark-all-read-btn';

  function getModhash() {
    // reddit global is available with @grant none
    if (typeof reddit !== 'undefined' && reddit.modhash) {
      return reddit.modhash;
    }
    return null;
  }

  function markAllRead(btn) {
    const modhash = getModhash();
    if (!modhash) {
      btn.textContent = 'error: not logged in';
      return;
    }

    btn.textContent = 'marking...';
    btn.disabled = true;

    fetch('/api/read_all_messages', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'uh=' + encodeURIComponent(modhash) + '&api_type=json',
    })
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        btn.textContent = 'done!';
        // Remove the "unread" style from all messages on the page
        document.querySelectorAll('.message.unread').forEach(msg => {
          msg.classList.remove('unread');
        });
        // Clear the orangered mail icon
        const mail = document.getElementById('mail');
        if (mail) {
          mail.classList.remove('havemail');
          mail.classList.add('nohavemail');
          mail.title = '';
        }
      })
      .catch(err => {
        btn.textContent = 'error — try again';
        btn.disabled = false;
        console.error('[Mark All Read]', err);
      });
  }

  function injectButton() {
    if (document.getElementById(BTN_ID)) return;

    const menuArea = document.querySelector('.menuarea');
    if (!menuArea) return;

    const spacer = document.createElement('div');
    spacer.className = 'spacer';

    const btn = document.createElement('a');
    btn.id = BTN_ID;
    btn.href = 'javascript:void(0)';
    btn.textContent = 'mark all as read';
    btn.style.cssText = 'font-weight:bold;color:#369;cursor:pointer;';
    btn.addEventListener('click', e => {
      e.preventDefault();
      markAllRead(btn);
    });

    spacer.appendChild(btn);
    menuArea.appendChild(spacer);
  }

  injectButton();
})();
