export default function ListaDePreciosRow({ lista }) {
    return (
        <>
            <div className="grid grid-cols-5 gap-2 border-b py-2 text-[#74716A] max-sm:w-full max-sm:grid-cols-1 max-sm:gap-4 max-sm:py-4">
                <div className="flex items-center max-sm:justify-center">
                    <div className="flex h-[80px] w-[80px] items-center justify-center bg-[#F5F5F5] max-sm:h-[60px] max-sm:w-[60px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                            <path d="M25.0837 3.58334V10.75C25.0837 11.7004 25.4612 12.6118 26.1332 13.2838C26.8052 13.9558 27.7166 14.3333 28.667 14.3333H35.8337M17.917 16.125H14.3337M28.667 23.2917H14.3337M28.667 30.4583H14.3337M26.8753 3.58334H10.7503C9.79997 3.58334 8.88853 3.96086 8.21653 4.63287C7.54452 5.30488 7.16699 6.21631 7.16699 7.16667V35.8333C7.16699 36.7837 7.54452 37.6951 8.21653 38.3671C8.88853 39.0391 9.79997 39.4167 10.7503 39.4167H32.2503C33.2007 39.4167 34.1121 39.0391 34.7841 38.3671C35.4561 37.6951 35.8337 36.7837 35.8337 35.8333V12.5417L26.8753 3.58334Z" stroke="#FF120B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div className="flex items-center max-sm:justify-center max-sm:text-lg max-sm:font-semibold">{lista?.name}</div>
                <div className="flex items-center uppercase max-sm:justify-center max-sm:text-sm">
                    <span className="hidden max-sm:mr-2 max-sm:inline max-sm:font-medium">Formato:</span>
                    {lista?.formato}
                </div>
                <div className="flex items-center max-sm:justify-center max-sm:text-sm">
                    <span className="hidden max-sm:mr-2 max-sm:inline max-sm:font-medium">Peso:</span>
                    {lista?.peso}
                </div>
                <div className="flex items-center max-sm:mt-2 max-sm:justify-center">
                    <a href={lista?.archivo} target="_blank" rel="noopener noreferrer" className="block w-full max-sm:w-auto">
                        <button className="bg-primary-orange h-10 w-full min-w-[138px] rounded-sm font-bold text-white max-sm:px-6">
                            Ver Online
                        </button>
                    </a>
                </div>
            </div>
        </>
    );
}
