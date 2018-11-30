module.exports = {
  open: '[aria-label="Users and Messages Toggle"]',
  close: '[aria-label="Users and Messages Toggle"]',
  me: '[aria-label~="You"]',
  present: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-presentation',
  promote: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-promote',
  demote: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-user',
  status: {
    open: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-user',
    away: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-time',
    hand: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-hand',
    undecided: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-undecided',
    confused: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-confused',
    sad: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-sad',
    happy: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-happy',
    applaud: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-applause',
    up: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-thumbs_up',
    down: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-thumbs_down',
    clear: 'i._imports_ui_components_dropdown_list__styles__itemIcon.icon-bbb-clear_status',
    avatar: {
      away: '[aria-label$="You  Status away"]',
      hand: '[aria-label$="You  Status raiseHand"]',
      undecided: '[aria-label$="You  Status neutral"]',
      confused: '[aria-label$="You  Status confused"]',
      sad: '[aria-label$="You  Status sad"]',
      happy: '[aria-label$="You  Status happy"]',
      applaud: '[aria-label$="You  Status applause"]',
      up: '[aria-label$="You  Status thumbsUp"]',
      down: '[aria-label$="You  Status thumbsDown"]',
      clear: '[aria-label$="You  Status none"]'
    }
  },
  panel: '[aria-label="User List"]'
}
