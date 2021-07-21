import PiqueTreeActionTypes from "../PiqueTree.actionTypes";
import PiqueTreeReducer from "../PiqueTree.reducer";

const initialState = {
    projects: [],
    projectName: '',
    riskLevel: '',
    orientation: '',
    tree: null,
    neighborNodes: false
}

test('should return the initial state', () => {
    expect(PiqueTreeReducer(undefined, {})).toEqual(initialState)
})

test('handle loading projects', () => {
    expect(PiqueTreeReducer(
        initialState, 
        {
            type: PiqueTreeActionTypes.SET_PROJECTS,
            payload: ["pique", "model"]
        })).toEqual({
        ...initialState,
        projects: ["pique", "model"]
    })
})

test('handle projectName', () => {
    expect(
        PiqueTreeReducer(
            initialState,
            {
                type: PiqueTreeActionTypes.SET_PROJECT_NAME,
                payload: "pique project"
            }
        )
    ).toEqual(
        {
            ...initialState,
            projectName: 'pique project'
        }
    )
})

test('handle riskLevel', () => {
    expect(
        PiqueTreeReducer(
            initialState,
            {
                type: PiqueTreeActionTypes.SET_RISK_LEVEL,
                payload: "red"
            }
        )
    ).toEqual(
        {
            ...initialState,
            riskLevel: 'red'
        }
    )
})

test('handle orientation', () => {
    expect(
        PiqueTreeReducer(
            initialState,
            {
                type: PiqueTreeActionTypes.SET_ORIENTATION,
                payload: "orientation"
            }
        )
    ).toEqual(
        {
            ...initialState,
            orientation: 'orientation'
        }
    )
})


test('handle tree', () => {
    expect(
        PiqueTreeReducer(
            initialState,
            {
                type: PiqueTreeActionTypes.SET_PIQUE_TREE,
                payload: {"name": "pique"}
            }
        )
    ).toEqual(
        {
            ...initialState,
            tree:  {"name": "pique"}
        }
    )
})

test('handle neighborNodes', () => {
    expect(
        PiqueTreeReducer(
            initialState,
            {
                type: PiqueTreeActionTypes.SET_NEIGHBOR_NODES,
            }
        )
    ).toEqual(
        {
            ...initialState,
            neighborNodes: true
        }
    )
})

