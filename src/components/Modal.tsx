import { useState } from 'react';

const Modal = ({ isOpen, closeModal }:{isOpen:boolean,closeModal:()=>void}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Modal Title</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="mt-4">
          <p>This is a simple modal. You can add any content here.</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default App;
