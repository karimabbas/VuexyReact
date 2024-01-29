const dateNow = Date.now()
const today = new Date(dateNow)
function addLeadingZeros (num, totalLength) {
  return String(num).padStart(totalLength, '0')
}
const format = (date) => {
  return `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1, 2)}-${date.getDate()}`
}

const initialState = {
  meetingList: [],
  employeeList: [],
  meetingSelected: null,
  loading: true,
  refresh: false,
  topicsSelected: [],
  meeting: null,
  agendaNum: '',
  agendaDate: [today]
}
const meetingArchive = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_MEETING_ARCHIVE':
      return { ...state, ...action }
    case 'SET_MEETING_TOPICS':
      let agendaDateTemp = state.agendaDate
      if (action?.topicsSelected?.agenda_date) {
        agendaDateTemp = action?.topicsSelected?.agenda_date
      }
      return { ...state, topicsSelected: action.topicsSelected, loading: false, agendaDate: agendaDateTemp }
    case 'SELECT_MEETING':
      return { ...state, meeting: action.meeting }
    case 'SELECT_AGENDA_NUM':
      return { ...state, agendaNum: action.agendaNum }
    case 'SELECT_AGENDA_DATE':
      return { ...state, agendaDate: action.agendaDate }
    case 'SET_SELECTED_MEETING':
      let meetingSelected = state.meetingList.filter(meeting => meeting.id === action.id)
      if (meetingSelected) {
        meetingSelected = meetingSelected[0]
      } else {
        meetingSelected = null
      }
      return { ...state, meetingSelected, loading: false }
    case 'ADD_MEETING':
      let data = state.meetingList
      const item = action.item
      const index = data.findIndex(itemData => itemData.id === +(item.id))
      if (index >= 0) {
        data[index] = item
      } else {
        data.unshift(item)
        data = data.map((item, index) => {
          return { ...item, rowId: index + 1 }
        })
      }
      return { ...state, meetingList: data, refresh: !state.refresh }
    case 'ADD_TOPIC_MEETING':
      let topics = state?.topicsSelected?.agenda_topic ?? []
      const topic = action.topic
      const indexTopic = topics?.findIndex(itemData => itemData.id === topic?.id)
      if (indexTopic >= 0) {
        topics[indexTopic] = topic
      } else {
        topics.unshift(topic)
        topics = topics.map((item, index) => {
          return { ...item, rowId: index + 1 }
        })
      }
      const topicsSelected = { ...state?.topicsSelected, agenda_topic: topics }
      return { ...state, topicsSelected, loading: false }

    case 'DELETE_MEETING':
      const meetings = state.meetingList.filter(item => item.id !== action.id)
      return { ...state, meetingList: meetings, refresh: !state.refresh, loading: false }
    case 'SET_MEETING_REFRESH':
      return { ...state, meetingSelected: null, refresh: !state.refresh, loading: false }
    case 'SET_MEETING_ARCHIVE_LOADING':
      return { ...state, loading: true }
    case 'UNSET_MEETING_ARCHIVE_LOADING':
      return { ...state, loading: false }
    default:
      return { ...state }
  }
}
export default meetingArchive
