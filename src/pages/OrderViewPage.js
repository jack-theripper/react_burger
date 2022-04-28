import React from 'react';
import {useParams} from "react-router-dom";

const OrderViewPage = () => {
	const params = useParams();


	return (
		<div>
			OrderViewPage: # {params.id}
		</div>
	);
};

export default OrderViewPage;