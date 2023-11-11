const Details = ({ details }: any) => {
  return (
    <>
      <div className="flex justify-center mb-6 items-center pl-24 rounded-md">
        <pre className="w-1200px custom-scrollbar">
          <code>{JSON.stringify(details, null, 2)}</code>
        </pre>
      </div>
    </>
  );
};

export default Details;
