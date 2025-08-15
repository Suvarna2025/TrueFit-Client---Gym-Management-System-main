import PropTypes from 'prop-types';


const Title = ({title, description}) => {
    return (
        <div className="px-3 text-center mb-10">
            <div className="inline-flex gap-2 items-center mb-3">
                <p className="text-2xl sm:text-4xl text-gray-700 dark:text-gray-300 font-prata">{title}</p>
                <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700 dark:bg-gray-300"></p>
            </div>
            <p className=" text-gray-600 dark:text-gray-400 w-3/4 m-auto text-xs sm:text-sm lg:text-lg">{description}</p>
        </div>
    );
};


Title.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

export default Title;