import * as React from "react";

export function Loader() {
	return (
		<div className="spinner-border" role="status" style={{ fontSize: "2rem" }}>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
