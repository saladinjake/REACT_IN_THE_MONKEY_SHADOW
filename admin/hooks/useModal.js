const useModal = () => {
  const handleClose = (id) => {
    const modal_el = document.querySelector(`.${id}`);

    console.log(modal_el);
  };

  return { handleClose };
};

export default useModal;
