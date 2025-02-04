import axios from 'axios';

const MyComponent = () => {
  const submitExam = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/submissions/submit', {
        studentId: '12345',
        examId: '6789',
        answers: 'The answers for the exam go here.',
      });
      console.log('Exam submitted:', response.data);
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/submissions/submissions');
      console.log('Submissions:', response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  return (
    <div>
      <button onClick={submitExam}>Submit Exam</button>
      <button onClick={fetchSubmissions}>Fetch Submissions</button>
    </div>
  );
};

export default MyComponent;
