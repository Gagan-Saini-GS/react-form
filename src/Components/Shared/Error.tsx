const Error = (errorMessage: any) => {
  return (
    <>
      {errorMessage.errorMessage !== "" && (
        <p className="w-full mb-1 ml-2 text-[#ed4337] font-semibold text-xs">
          {errorMessage.errorMessage}
        </p>
      )}
    </>
  );
};

export default Error;
