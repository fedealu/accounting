import * as React from "react";

const UserContext = React.createContext({
	name: "",
	balance: 0,
	updateLog: true,
	setName: (name: string) => {},
	setBalance: (balance: number) => {},
	shouldUpdateLog: (shouldUpdate: boolean) => {}
});

class UserProvider extends React.Component {
	public readonly state: {
		name: string;
		balance: number;
		updateLog: boolean;
	} = {
		name: String(localStorage.getItem("username") || ""),
		balance: 0,
		updateLog: true
	};

	private setBalance = (balance: number) => {
		this.setState(prevState => ({ balance }));
	};

	private setName = (name: string) => {
		localStorage.setItem("username", name);
		this.setState(prevState => ({ name }));
	};

	private shouldUpdateLog = (shouldUpdate: boolean) => {
		this.setState(prevState => ({ updateLog: shouldUpdate }));
	};

	public render() {
		const { children } = this.props;

		return (
			<UserContext.Provider
				value={{
					...this.state,
					setBalance: this.setBalance,
					setName: this.setName,
					shouldUpdateLog: this.shouldUpdateLog
				}}
			>
				{children}
			</UserContext.Provider>
		);
	}
}

export default UserContext;

export { UserProvider };
