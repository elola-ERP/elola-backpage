// src/pages/test.tsx
export default function TestPage({ message }: { message: string }) {
    return (
        <div>
            <h1>SSR Test</h1>
            <p>{message}</p>
        </div>
    );
}

export async function getServerSideProps() {
    console.log("SSR function started in Test Page");
    
    return {
        props: {
            message: "SSR is working!",
        },
    };
}
