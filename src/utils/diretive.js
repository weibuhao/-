import Vue from 'vue'
const directiveObj = Vue.directive('fofo', {
  inserted(el) {
    if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
      el.focus()
    } else {
      const theInput = el.querySelector('input')
      const theTextArea = el.querySelector('textarea')
      if (theInput) theInput.focus()
      if (theTextArea) theInput.focus()
    }
  },
  update(el) {
    if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
      el.focus()
    } else {
      const theInput = el.querySelector('input')
      const theTextArea = el.querySelector('textarea')
      if (theInput) theInput.focus()
      if (theTextArea) theInput.focus()
    }
  }
})

export default directiveObj
