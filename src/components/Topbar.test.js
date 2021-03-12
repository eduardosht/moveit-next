import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Topbar from './Topbar';
import { UserContext } from "../contexts/UserContext";

function renderUserContext(user) {
    return render(
        <UserContext.Provider value={{
            user
        }}>
            <Topbar />
        </UserContext.Provider>
    );
}

describe("Topbar component test", () => {
    it("logged user in context", () => {
        const user = {
            challengesCompleted: 2,
            displayName: "Eduardo Fujiwara",
            email: "teste@aew.com.br",
            experience: 19,
            level: 2,
            photoURL: null,
            uid: "Q0wKCx3EIdNPTZGO05YzDG4lpYG2",
        };

        renderUserContext(user);
        expect(screen.getByText("Sign out")).toBeInTheDocument();
    });
});