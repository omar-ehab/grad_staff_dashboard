import actions from './actions';

const initState = {
  students: [],
  error: ""
};

 
export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_ALL_STUDENTS_SUCCESS:
      const students = payload.students.map(student => {
        return {
          id: student.card_id,
          key: student.card_id,
          name: student.name,
          email: student.email,
          mobile: student.student_phone_number
        }
      })
      return {
        ...state,
        students
      };
    case actions.GET_ALL_STUDENTS_ERROR:
      return {
        ...state,
        error: payload.message
      };
    default:
      return state;
  }
}
